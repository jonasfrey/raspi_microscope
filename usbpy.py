import usb.core
import usb.util
import pprint
import time

a = list(usb.core.find(find_all=True))
for o in a:
    print('---')   
    pprint.pp(o.__dict__)



# Bus 003 Device 019: ID 045e:028e Microsoft Corp. Xbox360 Controller
# Replace these with your device's vendor ID and product ID
VENDOR_ID = 0x045e
PRODUCT_ID = 0x028e

# Find the device
device = usb.core.find(idVendor=VENDOR_ID, idProduct=PRODUCT_ID)

if device is None:
    raise ValueError('Device not found')

if device.is_kernel_driver_active(0):
    try:
        device.detach_kernel_driver(0)
        print("Kernel driver detached")
    except usb.core.USBError as e:
        print(f"Could not detach kernel driver: {str(e)}")


device.set_configuration()

# Example of reading a report; the parameters for ctrl_transfer depend on your device
try:
    n = 0 
    # Reading data from the IN endpoint
    endpoint_address = 0x81
    max_packet_size = 32
    while(n < 1000):
        data = device.read(endpoint_address, max_packet_size, timeout=1000)
        # data = device.ctrl_transfer(bmRequestType=0xA1, bRequest=0x01, wValue=0x0300, wIndex=0x00, data_or_wLength=32)
        print(data)
        n+=1
        time.sleep(1)
except usb.core.USBError as e:
    print(f"Error reading report: {str(e)}")