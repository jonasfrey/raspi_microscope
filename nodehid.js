// npm install node-hid
// 
var HID = await import('node-hid');
var a_o_device = await HID.devicesAsync();

console.log(a_o_device)

