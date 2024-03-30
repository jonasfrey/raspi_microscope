// ffi.ts


if(Deno.uid() !== 0){
  console.log('run as root!')
  Deno.exit(1);
}
import {
  f_o_command
} from "https://deno.land/x/o_command@0.9/mod.js"
// Determine library extension based on
// your OS.
let s_suffix = "";
switch (Deno.build.os) {
  case "windows":
    s_suffix = "dll";
    break;
  case "darwin":
    s_suffix = "dylib";
    break;
  default:
    s_suffix = "so";
    break;
}

let a_s_path_abs_folder = [
  "/usr/lib",
  "/usr/local/lib",
  "/lib"
]
let s_command = null;
let o_command = null;
s_command = `ldconfig -p | grep libusb`
o_command = await f_o_command(s_command);
console.log(`s_command: ${s_command}`)
console.log(o_command.s_stdout)


let s_path_abs_file_lib = `/lib/x86_64-linux-gnu/libusb-1.0.so`
s_command = `nm -D ${s_path_abs_file_lib}`
o_command = await f_o_command(s_command);
console.log(`s_command: ${s_command}`)
console.log(o_command.s_stdout)



let o_options = {
  "libusb_init": { parameters: ["pointer"], result: "u32" },
  "libusb_exit": { parameters: ["pointer"], result: "u32" },
  // "libusb_get_device_list": { parameters: ["pointer", "pointer"], result: "u32" },
  "libusb_open_device_with_vid_pid": { parameters: ["pointer", "i16", "i16"], result: "u32" },
  "libusb_get_device": { parameters: ["pointer"], result: "u32" },
  // "libusb_get_device_list": {parameters: ["pointer", "pointer"], result: "i64"}
  // "libusb_get_device_list": {
  //   parameters: []
  // }
  // "add": { parameters: ["isize", "isize"], result: "isize" },
}
let o_dylib = null;
// for(let s_path_abs_folder of a_s_path_abs_folder){
//   try {
//     o_dylib = Deno.dlopen(
//       `${s_path_abs_folder}/libusb.${s_suffix}`,
//       o_options
//     );
//   } catch (error) {
//     console.log(error)
//   }
// }
o_dylib = Deno.dlopen(
  s_path_abs_file_lib,
  o_options
);
console.log(o_dylib)


let n_return_value = null;
let o_null_pointer = Deno.UnsafePointer.create(0n);

let s_name ='libusb_init'
console.log(o_dylib.symbols[s_name])
n_return_value = o_dylib.symbols[s_name](o_null_pointer);
if (n_return_value === 0) {
  console.log(`Success: ${s_name} returned: ${n_return_value}`);
} else {
  console.error(`Error: ${s_name} returned: ${n_return_value}`);
}


// //Bus 003 Device 032: ID 2563:0526 ShenZhen ShanWan Technology Co., Ltd. Android Gamepad
let n_id_vendor = 0x2563;
let n_id_product = 0x0526;

// // const target = new BigUint64Array(Deno.UnsafePointerView.getArrayBuffer(param_response, 8);
// // 8 bytes ie. pointer size on a 64 bit machine, use BigUin64Array to get a writable and suitable view into it.

// // Prepare to call libusb_get_device_list
// // Preparing for the device list pointer (devs**)
// const deviceListPtr = new BigUint64Array(1); // Buffer to hold the device list pointer address
// // Allocate an UnsafePointer to pass to the function. This is where the correction is applied:
// let placeholder = new ArrayBuffer(8); // Reserve space for the pointer
// const deviceListPtrPointer = new Deno.UnsafePointerView(placeholder);
// console.log(deviceListPtrPointer)
// // Make the FFI call
// const deviceCount = libusb.symbols.libusb_get_device_list(o_null_pointer, deviceListPtrPointer.pointer);


// console.log(libusb.symbols.libusb_get_device_list)
// // let a = new ArrayBuffer();
// let o_list_pointer = Deno.UnsafePointer.create(0n);

// f_v_dynfunction('libusb_init');
let n_ret = null;
let o_pointer = null;
////-------------
n_ret = o_dylib.symbols.libusb_open_device_with_vid_pid(
  Deno.UnsafePointer.create(0n),
  n_id_vendor, 
  n_id_product,
  )
console.log({n_ret})
// o_pointer 
let n_pointer__libusb_device_handle = Deno.UnsafePointer.create(n_ret);
// let n_pointer__libusb_device_handle = Deno.UnsafePointer.value(n_ret);
n_pointer__libusb_device_handle = BigInt(
  n_pointer__libusb_device_handle
)

n_ret = o_dylib.symbols.libusb_get_device(
  n_pointer__libusb_device_handle
)
// console.log({n_ret})
// o_pointer = Deno.UnsafePointer.value(n_ret);
// let n_pointer__libusb_device = BigInt(
//   o_pointer
// )
// console.log({
//   n_pointer__libusb_device
// })


// console.log(n2)


// console.log(n_pointer__libusb_device_handle)

// // libusb_open_device_with_vid_pid()



// ◆ libusb_get_device()
// libusb_device* libusb_get_device 	( 	libusb_device_handle *  	dev_handle	) 	

// const value = api.hid_open(vendorId, productId, serialNumber);
// return BigInt(Deno.UnsafePointer.value(value));



s_name ='libusb_exit'
console.log(o_dylib.symbols[s_name])
n_return_value = o_dylib.symbols[s_name](o_null_pointer);
if (n_return_value === 0) {
  console.log(`Success: ${s_name} returned: ${n_return_value}`);
} else {
  console.error(`Error: ${s_name} returned: ${n_return_value}`);
}
