// could be run with deno but deno crashes with version 1.42.0
// so node script.js
import {
    O_enum_value,
    O_input_sensor,
    O_input_device
} from "./classes.module.js"
import { f_exit, f_n_from_string, f_o_json_decoded_from_file, f_s_first_letter_uppercase, f_s_input_from_cli, f_write_o_json_encoded } from "./functions.module.js";
import { a_o_input_device } from "./runtimedata.module.js";
let usb = await import('usb');
let path = await import('path');

// # Get the directory of the current script
const s_path_abs_folder_current_script = path.dirname(import.meta.url.split('//').pop());
const s_path_abs_file_config = `${s_path_abs_folder_current_script}/o_config.json`

let f_o_config = async function(){
    return f_o_json_decoded_from_file(s_path_abs_file_config)
}
let f_write_o_config = async function(o){
    return f_write_o_json_encoded(s_path_abs_file_config, o)
}



// let v = await f_s_input_from_cli('give me your name: ')
// console.log(v)
// Function to read digits from a string

let f_update_device_info = async function(o_device){
    o_device.open()
    let a_s = [
        'iManufacturer',
        'iProduct',
        'iSerialNumber',
    ]
    return new Promise((f_res, f_rej)=>{
        Promise.all(
            a_s.map(s=>{
                return new Promise((f_res, f_rej)=>{
                    return o_device.getStringDescriptor(o_device.deviceDescriptor[s], function(o_e, v){
                        o_device[`v_${s}`] = v
                        return f_res(o_device)
                    })  

                })
            })
        ).then(()=>{
            o_device.close()
            return f_res(o_device)
        })

    })
}
let a_o_devices = usb.getDeviceList()
console.log('reading devices...')
for(let o of a_o_devices){
    o = await f_update_device_info(o)
    // console.log(o)
}
console.log(a_o_devices)
let o_config = {
    "n_id_vendor": 0, 
    "n_id_product": 0
}
o_config = await f_o_config()
try{
    o_config = await f_o_config()
}catch{
    f_write_o_config(o_config)
}
let o_device = a_o_devices.find(o=>{
    return o.deviceDescriptor.idProduct == o_config.n_id_product
    && o.deviceDescriptor.idVendor == o_config.n_id_vendor
});


console.log('done reading devices')
let s = a_o_devices.map((o, n_idx)=>{
    let s_vendor_id_product_id = [
        o.deviceDescriptor.idVendor.toString(16),
        o.deviceDescriptor.idProduct.toString(16)
    ].join(':')
    return [
        `${(n_idx+1).toString().padStart(2, ' ')} )`, 
        `Bus ${o.busNumber.toString().padStart(3, '0')}`, 
        `Dev ${o.deviceAddress.toString().padStart(3, '0')}`, 
        `vid:pid`, 
        [
            o.deviceDescriptor.idVendor.toString(16).padStart(4, '0'),
            o.deviceDescriptor.idProduct.toString(16).padStart(4, '0')
        ].join(':'),
        `${o.v_iManufacturer}`,
        `${o.v_iProduct}`

    ].join(' ')
}).join('\n')


let n_idx_dev = 0;
if(o_device){
    n_idx_dev = a_o_devices.indexOf(o_device);
}
let n = await f_s_input_from_cli(
    `${s} \n select a device [${n_idx_dev+1}]: `
)
o_device = a_o_devices[parseInt(n)-1];
o_config.n_id_product = o_device.deviceDescriptor.idProduct
o_config.n_id_vendor = o_device.deviceDescriptor.idVendor
await f_write_o_config(o_config)

let o_input_device = a_o_input_device.find(
    o=>{
        return (
            o.n_id_product == o_device.deviceDescriptor.idProduct
            &&
            o.n_id_vendor == o_device.deviceDescriptor.idVendor
        )
    }
)
console.log(o_input_device)
// f_exit(0)
o_device.open()
await new Promise((f_res, f_rej)=>{
    o_device.reset(()=>{
        return f_res(true)
    
    })
})
const interfaceNumber = 0;
const iface = o_device.interface(interfaceNumber);
if (iface.isKernelDriverActive()) {
  iface.detachKernelDriver()
}
iface.claim();
console.log({
    iface, 
    iface_endpoints: iface.endpoints
})
const endpointAddress = 0x81;
const endpoint = iface.endpoint(endpointAddress);
const maxPacketSize = o_device.deviceDescriptor.bMaxPacketSize0;
console.log(o_device)
console.log(endpoint);
console.log(endpoint.transferType)
let f_read_data = async function(){
  return new Promise((f_res, f_rej)=>{
    endpoint.transfer(
        endpoint?.descriptor.wMaxPacketSize, (error, data) => {
      if (error) {
        console.error('Error reading from endpoint:', error);
        return f_rej(error)
      } else {
        console.log('Data received:', data);
        return f_res(data)
      }
      return f_rej('none')
    });
  })
}

let f_as = async function(){

  let n = 0
  while (n < 100000){
    let a_n_u8 = await f_read_data();
    // a_n_u8 = new Uint8Array(a_n_u8);
    console.log(a_n_u8.length)

    for(let n_idx = 0; n_idx < a_n_u8.byteLength; n_idx+=1){
        let n_byte_value = a_n_u8[n_idx];
        // console.log(n_byte_value)
        console.log(`${n_idx.toString().padStart(3, '0')}: ${n_byte_value.toString(2).padStart(8,'0')}`)
    }

    if(!o_input_device?.a_o_input_sensor){
        console.log('no button-bit-assignment found :( !')
        console.log('please createa a "O_input_device" in ./runtimedata.module.js for this device!')
        continue
    }
    let n_bit = 0
    let o_data_view = new DataView(a_n_u8.buffer);
    for (let n_idx in o_input_device.a_o_input_sensor){
        let o = o_input_device.a_o_input_sensor[n_idx]
        let n_idx_byte = parseInt(n_bit / 8) //# eg. 2
        let n_bits = f_n_from_string(o.s_type) //# for example 'u4' -> 4

        let s_name_function = [
            'get', 
            f_s_first_letter_uppercase(`${(o.s_type.includes('u') ? 'u': '')}int`),
            (Math.ceil(n_bits/8)*8).toString()
        ].join('');
        let b_little_endian = true;
        let n_value_number = o_data_view[
            s_name_function
        ](n_idx_byte, b_little_endian); 
        let n_idx_bit = n_bit % 8 //# eg. 4

        // console.log(
        //     `${n_idx_byte} ${s_name_function} ${n_value_number} ${n_idx_bit}`
        // )    
        let n_value_max = (Math.pow(2,n_bits)-1) //# eg. 2^4-1 = 16-1 = 15 => 0b1111
        if([8,16,32,64].includes(n_bits) == false){
            // todo , improve
            n_value_number = n_value_number >> (n_idx_bit) & n_value_max
        }
        if(o.s_type.includes('i')){
            n_value_max  = n_value_max /2
            //# n_value_byte -= n_value_max 
            // }
        } 

        o.value = n_value_number
        o.n_nor = n_value_number / n_value_max
        if(o.a_o_enum_value){
            console.log(o.a_o_enum_value)
            o.o_enum_value = o.a_o_enum_value.find(
                o=>{
                    console.log(o)
                    return o.n == n_value_number
                }
            )
        }
        n_bit+=n_bits
        let v = o.n_nor
        if(o.o_enum_value){
            v = o.o_enum_value.s
        }
        console.log(
            `${o.s_name.toString().padStart(30, ' ')}: ${v}`
        )
    }


    n+=1;
  }
}
console.log(endpoint);
// try{
//     await f_as()
// }catch(o_e){
//     console.log(o_e)
//     iface.release()
//     // iface.attachKernelDriver(),
//     // o_device.close()
// }



// write rumble 

console.log('asdf---')
// console.log(o_device.interfaces[0].endpoints[1])

const out_address = 0x02;
const endp = iface.endpoint(out_address);
// o_device.controlTransfer(bmRequestType, bRequest, wValue, wIndex, data_or_length, callback(error, data))

endp.transfer(
    new Uint8Array(
        0x09,0x08,0x00,0x09,0x00,0x0f,0x20,0x04,0x20,0x20,0xFF,0x00
    ).buffer,
    // (new Uint8Array(
    //     new Array(endp?.descriptor.wMaxPacketSize).fill(0).map((n, n_idx)=>{
    //         // return parseInt(Math.random()*255)
    //         return 255
    //     })
    // )).buffer, 
    (o_e)=>{
        console.log('data sent?')
        console.log(o_e)
    }
)
// setInterval(()=>{

// },1000)

// endpoint.startPoll(
//     3, 
//     32, 
//     function(){
//         console.log(...arguments)
//     },

// )

// setInterval(()=>{
// },100)
// // while(true){
// // }
