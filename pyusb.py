import usb.core
import usb.util
# pip3 install pyusb

# Gamepad specifics
vendor_id = 0x2563
product_id = 0x0526

# Find the device
dev = usb.core.find(idVendor=vendor_id, idProduct=product_id)

if dev is None:
    raise ValueError('Device not found')

# Detach kernel driver if necessary
if dev.is_kernel_driver_active(0):
    try:
        dev.detach_kernel_driver(0)
    except usb.core.USBError as e:
        sys.exit("Could not detach kernel driver: %s" % str(e))

# Set the active configuration. With no arguments, the first configuration will be the active one
dev.set_configuration()

# Get an endpoint instance
cfg = dev.get_active_configuration()
interface_number = cfg[(0,0)].bInterfaceNumber
alternate_setting = usb.control.get_interface(dev, interface_number)
intf = usb.util.find_descriptor(
    cfg, bInterfaceNumber = interface_number,
    bAlternateSetting = alternate_setting
)

ep = usb.util.find_descriptor(
    intf,
    # match the first IN endpoint
    custom_match = \
    lambda e: \
        usb.util.endpoint_direction(e.bEndpointAddress) == \
        usb.util.ENDPOINT_IN
)

assert ep is not None

# Attempt to read 32 bytes from the endpoint
try:
    data = dev.read(ep.bEndpointAddress, ep.wMaxPacketSize)
    print(data)
except usb.core.USBError as e:
    print("Could not read data: %s" % str(e))