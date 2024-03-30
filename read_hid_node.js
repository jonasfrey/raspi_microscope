// this script uses node libraries 
// but still can be run with deno run -A scriptname.js 
// npm install node-hid
const HID = require('node-hid');
//npm install onoff
let path = require('path');

// # Get the directory of the current script
const s_path_abs_folder_current_script = path.dirname(__filename);
const s_path_abs_file_config = `${s_path_abs_folder_current_script}/o_config.json`

//  os.path.dirname(os.path.abspath(__file__))

let o_config = {
    "n_id_vendor": 0, 
    "n_id_product": 0
}
try{
    o_config = f_o_config()
}catch{
    f_write_o_config(o_config)
}


let a_o = await HID.devicesAsync();
// print(a_o)
// # exit()


a_s = [f"{str(n_idx+1).ljust(2,' ')} {o['manufacturer_string']} - {o['product_string']}" for (n_idx, o) in enumerate(a_o)]
# input_with_timeout(f"select a device: \n {"\n".join(a_s)}", 10)  # 10 seconds timeout
s_devices = '\n'.join(a_s)
o_device_from_config = next((
    o
    for 
    o
    in 
    a_o
    if(
        o['product_id'] == o_config['n_id_product']
        and 
        o['vendor_id'] == o_config['n_id_vendor']
    )
), None)

if(o_device_from_config is None):
    n_idx = 0
else: 
    n_idx = a_o.index(o_device_from_config)

s_user_input = input_with_timeout(f"Select a device (default {n_idx+1}):\n{s_devices}\n", 10)  
if(s_user_input is not None):
    n_idx = int(s_user_input)-1

o_device = a_o[n_idx]
o_config['n_id_product'] = o_device['product_id']
o_config['n_id_vendor'] = o_device['vendor_id']
f_write_o_config(o_config)
print(o_device)
# Connect to your device
# You need to replace VENDOR_ID and PRODUCT_ID with your device's values

o_input_device = next(
    (
        o
        for
        o
        in 
        a_o_input_device
        if(
            o.n_id_product == o_device['product_id']
            and 
            o.n_id_vendor == o_device['vendor_id']
        )
    ),
    None 
)
try:
    device = hid.device()
    device.open(
        o_device['vendor_id'],
        o_device['product_id'],
    )
    device.set_nonblocking(True)

    # device = hid.device()
    # device = hid.Device(VENDOR_ID, PRODUCT_ID)

    # Print the device details
    print("Manufacturer: {}".format(device.get_manufacturer_string()))
    print("Product: {}".format(device.get_product_string()))

    # Attempt to read data (example)
    while True:
        data = device.read(32)
        if data:
            if(o_input_device is not None):
                n_bit = 0
                for n_idx,o in enumerate(o_input_device.a_o_input_sensor): 
                    n_idx_byte = int(n_bit / 8) # eg. 2
                    n_value_byte = data[n_idx_byte] # eg. 0b01101111

                    n_bits = f_n_from_string(o.s_type) # for example 'u4' -> 4
                    n_idx_bit = n_bit % 8 # eg. 4
                        
                    n_value_max = ((2**n_bits)-1) # eg. 2^4-1 = 16-1 = 15 => 0b1111
                    n_value_byte = n_value_byte >> (n_idx_bit) & n_value_max
                    if('i' in o.s_type):
                        n_value_byte = int.from_bytes(n_value_byte.to_bytes(1, 'big'), 'big', signed=True)
                        # n_value_max  = n_value_max /2 
                        # n_value_byte -= n_value_max 
                    o.value = n_value_byte
                    o.n_nor = n_value_byte / n_value_max
                    if(o.a_o_enum_value is not None):
                        o.o_enum_value = next(
                            (
                                o
                                for
                                o
                                in
                                o.a_o_enum_value
                                if(
                                    o.n == n_value_byte
                                )
                            ),
                            None
                        )

                    n_bit+=n_bits
                    v = o.n_nor
                    if(o.o_enum_value is not None):
                        v = o.o_enum_value.s
                    print(f"{o.s_name.ljust(30, ' ')}: {v}")
                # print(o.n_nor)
            else: 
                for n in range(0, len(data)): 
                    s_bytes = format(data[n], '08b')
                    print(f"{str(n).zfill(3)}  {s_bytes}")

                print(data)

except IOError as e:
    print(e)
finally:
    device.close()
