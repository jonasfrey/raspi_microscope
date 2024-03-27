# pip3 install hidapi
# sudo pip3 install hidapi
# sudo apt install python3-hidapi
import hid

import threading
import queue
import json
import os

def f_n_from_string(s):
    return int(''.join([char for char in s if char.isdigit()]))
class O_input_sensor:
    # Initializer / Instance Attributes
    def __init__(self, s_name, s_type):
        self.s_name = s_name
        self.s_type = s_type
        self.value = 0
        self.n_nor = 0


class O_input_device:
    # Initializer / Instance Attributes
    def __init__(self, s_name, a_o_input_sensor):
        self.s_name = s_name
        self.a_o_input_sensor = a_o_input_sensor

s_padding_or_not_found_out_yet = 'padding_or_not_found_out_yet'

o_input_device_shenzhen_shanwan_android_gamepad = O_input_device(
    'ShenZhen ShanWan Technology Co., Ltd. Android Gamepad', 
    [
        O_input_sensor(
            s_padding_or_not_found_out_yet,
            'u8'
        ),
        O_input_sensor(
            'left_x_axis', 
            'i8'
        ),
        O_input_sensor(
            'left_y_axis', 
            'i8'
        ),
        O_input_sensor(
            'right_x_axis', 
            'i8'
        ),
        O_input_sensor(
            'right_y_axis', 
            'i8'
        ),
        O_input_sensor(
            'd_pad_values', 
            'u8'
        ),
        O_input_sensor(
            'A', 
            'u1'
        ),
        O_input_sensor(
            'B', 
            'u1'
        ),
        O_input_sensor(
            s_padding_or_not_found_out_yet, 
            'u1'
        ),
        O_input_sensor(
            'X', 
            'u1'
        ),
        O_input_sensor(
            'Y', 
            'u1'
        ),
        O_input_sensor(
            s_padding_or_not_found_out_yet, 
            'u1'
        ),
        O_input_sensor(
            'L1', 
            'u1'
        ),
        O_input_sensor(
            'R1', 
            'u1'
        ),
        #
        O_input_sensor(
            'L2_pressed', 
            'u1'
        ),
        O_input_sensor(
            'R2_pressed', 
            'u1'
        ),
        O_input_sensor(
            'back_select', 
            'u1'
        ),
        O_input_sensor(
            'Start', 
            'u1'
        ),
        O_input_sensor(
            s_padding_or_not_found_out_yet, 
            'u1'
        ),
        O_input_sensor(
            "L3", 
            'u1'
        ),
        O_input_sensor(
            'R3', 
            'u1'
        ),
        O_input_sensor(
            s_padding_or_not_found_out_yet, 
            'u1'
        ),
        O_input_sensor(
            'R2_intensity', 
            'u8'
        ),
        O_input_sensor(
            'L2_intensity', 
            'u8'
        ),
    ]
)

# Get the directory of the current script
s_path_abs_folder_current_script = os.path.dirname(os.path.abspath(__file__))

def f_o_config():
    # Reading JSON data
    with open(s_path_abs_file_config, 'r') as file:
        o_config = json.load(file)
        return o_config
    
def f_write_o_config(v):
    # Writing JSON data
    with open(s_path_abs_file_config, 'w') as f:
        json.dump(v, f, indent=4)


o_config = {
    "n_id_vendor": 0, 
    "n_id_product": 0
}
s_path_abs_file_config = f"{s_path_abs_folder_current_script}/o_config.json"
try:
    o_config = f_o_config()
except:
    f_write_o_config(o_config)


# Function to execute input and put it into a queue
def prompt_input(prompt, output_queue):
    user_input = input(prompt)
    output_queue.put(user_input)

# Main function to call the prompt with a timeout
def input_with_timeout(prompt, timeout):
    output_queue = queue.Queue()
    input_thread = threading.Thread(target=prompt_input, args=(prompt, output_queue))
    input_thread.daemon = True
    input_thread.start()
    input_thread.join(timeout)
    if input_thread.is_alive():
        print("\nTimeout reached, input was not provided within the time limit.")
        return None  # Indicates that a timeout occurred
    else:
        return output_queue.get()  # Retrieves the input from the queue

# input_with_timeout("Enter something: ", 10)  # 10 seconds timeout


# List all connected HID devices
# Bus 009 Device 002: ID 0639:7213 Chrontel, Inc. Billboard
# Bus 009 Device 001: ID 1d6b:0002 Linux Foundation 2.0 root hub
# Bus 010 Device 001: ID 1d6b:0003 Linux Foundation 3.0 root hub
# Bus 008 Device 004: ID 0b95:1790 ASIX Electronics Corp. AX88179 Gigabit Ethernet
# Bus 008 Device 003: ID 0bc2:231a Seagate RSS LLC Expansion Portable
# Bus 008 Device 002: ID 2109:0817 VIA Labs, Inc. USB3.0 Hub             
# Bus 008 Device 001: ID 1d6b:0003 Linux Foundation 3.0 root hub
# Bus 007 Device 009: ID 2109:8888 VIA Labs, Inc. USB Billboard Device   
# Bus 007 Device 007: ID 0c45:1915 Microdia USB 2.0 Camera
# Bus 007 Device 006: ID 058f:3822 Alcor Micro Corp. MikrOkularHD
# Bus 007 Device 005: ID 14cd:1212 Super Top microSD card reader (SY-T18)
# Bus 007 Device 003: ID 14cd:8601 Super Top 4-Port hub
# Bus 007 Device 012: ID 2563:0526 ShenZhen ShanWan Technology Co., Ltd. Android Gamepad
# Bus 007 Device 002: ID 2109:2817 VIA Labs, Inc. USB2.0 Hub             
# Bus 007 Device 001: ID 1d6b:0002 Linux Foundation 2.0 root hub
# Bus 006 Device 001: ID 1d6b:0003 Linux Foundation 3.0 root hub
# Bus 005 Device 001: ID 1d6b:0002 Linux Foundation 2.0 root hub
# Bus 004 Device 005: ID 05e3:0626 Genesys Logic, Inc. Hub
# Bus 004 Device 004: ID 05e3:0626 Genesys Logic, Inc. Hub
# Bus 004 Device 003: ID 0bda:0411 Realtek Semiconductor Corp. Hub
# Bus 004 Device 002: ID 2109:0817 VIA Labs, Inc. USB3.0 Hub             
# Bus 004 Device 001: ID 1d6b:0003 Linux Foundation 3.0 root hub
# Bus 003 Device 004: ID 0489:e0d8 Foxconn / Hon Hai Wireless_Device
# Bus 003 Device 007: ID 20a0:422d Clay Logic ps2avrGB
# Bus 003 Device 009: ID 046d:0aba Logitech, Inc. PRO X Wireless Gaming Headset
# Bus 003 Device 008: ID 046d:c534 Logitech, Inc. Unifying Receiver
# Bus 003 Device 006: ID 05e3:0610 Genesys Logic, Inc. Hub
# Bus 003 Device 005: ID 05e3:0610 Genesys Logic, Inc. Hub
# Bus 003 Device 003: ID 0bda:5411 Realtek Semiconductor Corp. RTS5411 Hub
# Bus 003 Device 002: ID 2109:2817 VIA Labs, Inc. USB2.0 Hub             
# Bus 003 Device 001: ID 1d6b:0002 Linux Foundation 2.0 root hub
# Bus 002 Device 001: ID 1d6b:0003 Linux Foundation 3.0 root hub
# Bus 001 Device 002: ID 048d:c102 Integrated Technology Express, Inc. ITE Device(8910)
# Bus 001 Device 001: ID 1d6b:0002 Linux Foundation 2.0 root hub
a_o = hid.enumerate()
print(a_o)
# exit()


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
            n_bit = 0
            for n_idx,o in enumerate(o_input_device_shenzhen_shanwan_android_gamepad.a_o_input_sensor): 
                n_idx_byte = int(n_bit / 8) # eg. 2
                n_value_byte = data[n_idx_byte] # eg. 0b01101111

                n_bits = f_n_from_string(o.s_type) # for example 'u4' -> 4
                n_idx_bit = n_bit % 8 # eg. 4
                    
                n_value_max = ((2**n_bits)-1) # eg. 2^4-1 = 16-1 = 15 => 0b1111
                n_value_byte = n_value_byte >> (n_idx_bit) & n_value_max
                if('i' in o.s_type):
                    n_value_max  = n_value_max /2 
                    n_value_byte -= n_value_max 
                o.value = n_value_byte
                o.n_nor = n_value_byte / n_value_max

                n_bit+=n_bits
                print(f"{o.s_name.ljust(30, ' ')}: {o.n_nor}")
                # print(o.n_nor)
            # for n in range(0, len(data)): 
            #     s_bytes = format(data[n], '08b')
            #     print(f"{str(n).zfill(3)}  {s_bytes}")

            # print(data)

except IOError as e:
    print(e)
finally:
    device.close()