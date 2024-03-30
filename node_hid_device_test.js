const HID = await import('node-hid');

// Replace with your device's vendorId and productId
const vendorId = 1739;
const productId = 52856;

// Find the device
let a_o =  HID.devices()
console.log(a_o)
const deviceInfo = a_o.find(d => d.vendorId === vendorId && d.productId === productId);

if (deviceInfo) {
  try {
    // Open the device
    // const device = new HID.HID(deviceInfo.path);
    var device = await HID.HIDAsync.open(deviceInfo.path);

    // Set up a listener for incoming data
    device.on('data', function(data) {
      console.log('Data received:', data);
    });

    // Optionally, set up an error listener
    device.on('error', function(err) {
      console.error('Error:', err);
    });

  } catch (error) {
    console.error('Failed to open device:', error);
  }
} else {
  console.log('Device not found');
}