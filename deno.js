// Load the library
const lib = Deno.dlopen("libusb-1.0.so", {
    "libusb_init": { parameters: ["buffer"], result: "i32" },
    "libusb_open_device_with_vid_pid": { parameters: ["pointer", "u16", "u16"], result: "pointer" },
    "libusb_claim_interface": { parameters: ["pointer", "i32"], result: "i32" },
    // Correct other functions as needed...
  });
  
  const ctxPtrBuffer = new ArrayBuffer(128); // Enough space for a pointer
//   let ctxPtr = new BigUint64Array(ctxPtrBuffer)[0]; // Initialize to 0 (NULL)
// Initialize libusb to fill ctxPtr with the context
const resultInit = lib.symbols.libusb_init(ctxPtrBuffer);
if (resultInit !== 0) {
    console.error("Error initializing libusb");
    Deno.exit(-1);
}
console.log(resultInit)

let ctxPtr = Deno.UnsafePointer.create(ctxPtrBuffer[0]);
  // The context pointer is now stored in ctxPtrBuffer, but we need to use it as a pointer.
  // In Deno FFI, when you need to pass this context as a "pointer", you directly pass the ArrayBuffer.
  
  // Open the device with the context
  const handlePtr = lib.symbols.libusb_open_device_with_vid_pid(ctxPtr, 0x2563, 0x0526);
  console.log(handlePtr)
  if (handlePtr.value === 0) {
    console.error("Could not open device");
    // Assuming libusb_exit is correctly defined and added to your dlopen calls
    lib.symbols.libusb_exit(ctxPtr); // Correctly passing the context buffer
    Deno.exit(-1);
  }
  // Add your logic for libusb_interrupt_transfer and handling data...
  
  // Always ensure to release interfaces, close devices, and deinitialize libusb properly before exiting.
  