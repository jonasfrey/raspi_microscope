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

class O_enum_value:
    def __init__(
        self,
        n,
        s,
        s_comment
    ):
        self.n = n
        self.s = s
        self.s_comment = s_comment

class O_input_sensor:
    def __init__(
            self,
            s_type,
            s_name,
            o_enum_value=None,
        ):
        self.s_type = s_type
        self.s_name = s_name
        self.a_o_enum_value = o_enum_value
        self.value = 0
        self.o_enum_value = None
        self.n_nor = 0


class O_input_device:
    def __init__(
        self,
        s_name,
        n_id_vendor,
        n_id_product,
        a_o_input_sensor,
    ):
        self.s_name = s_name
        self.n_id_vendor = n_id_vendor
        self.n_id_product = n_id_product
        self.a_o_input_sensor = a_o_input_sensor

s_padding_or_not_found_out_yet = 'padding_or_not_found_out_yet'

o_input_device_shenzhen_shanwan_android_gamepad = O_input_device(
    'ShenZhen ShanWan Technology Co., Ltd. Android Gamepad', 
    9571,
    1318,
    [
        O_input_sensor(
            'u8',  s_padding_or_not_found_out_yet,
        ),
        O_input_sensor(
            'i8', 'left_x_axis', 
        ),
        O_input_sensor(
            'i8', 'left_y_axis', 
        ),
        O_input_sensor(
            'i8', 'right_x_axis', 
        ),
        O_input_sensor(
            'i8', 'right_y_axis', 
        ),
        O_input_sensor(
            'u8', 'd_pad_values', 
        ),
        O_input_sensor(
            'u1', 'A', 
        ),
        O_input_sensor(
            'u1', 'B', 
        ),
        O_input_sensor(
            'u1',  s_padding_or_not_found_out_yet, 
        ),
        O_input_sensor(
            'u1', 'X', 
        ),
        O_input_sensor(
            'u1', 'Y', 
        ),
        O_input_sensor(
            'u1',  s_padding_or_not_found_out_yet, 
        ),
        O_input_sensor(
            'u1', 'L1', 
        ),
        O_input_sensor(
            'u1', 'R1', 
        ),
        #
        O_input_sensor(
            'u1', 'L2_pressed', 
        ),
        O_input_sensor(
            'u1', 'R2_pressed', 
        ),
        O_input_sensor(
            'u1', 'back_select', 
        ),
        O_input_sensor(
            'u1', 'Start', 
        ),
        O_input_sensor(
            'u1',  s_padding_or_not_found_out_yet, 
        ),
        O_input_sensor(
            'u1', "L3", 
        ),
        O_input_sensor(
            'u1', 'R3', 
        ),
        O_input_sensor(
            'u1',  s_padding_or_not_found_out_yet, 
        ),
        O_input_sensor(
            'u8', 'R2_intensity', 
        ),
        O_input_sensor(
            'u8', 'L2_intensity', 
        ),
    ]
)

a_o_enum_value__keys = [
    
    # O_enum_value(0x00, 'KEY_none', 'No key pressed'), 
    O_enum_value(0x01, 'KEY_ERR_OVF', 'keyboard error roll over overflow to many keys are pressed'), 
    O_enum_value(0x02, 'keyboard_post_fail', ''), 
    O_enum_value(0x03, 'keyboard_error_undefined', ''), 
    O_enum_value(0x04, 'KEY_A', 'Keyboard a and A'), 
    O_enum_value(0x05, 'KEY_B', 'Keyboard b and B'),
    O_enum_value(0x06, 'KEY_C', 'Keyboard c and C'),
    O_enum_value(0x07, 'KEY_D', 'Keyboard d and D'),
    O_enum_value(0x08, 'KEY_E', 'Keyboard e and E'),
    O_enum_value(0x09, 'KEY_F', 'Keyboard f and F'),
    O_enum_value(0x0a, 'KEY_G', 'Keyboard g and G'),
    O_enum_value(0x0b, 'KEY_H', 'Keyboard h and H'),
    O_enum_value(0x0c, 'KEY_I', 'Keyboard i and I'),
    O_enum_value(0x0d, 'KEY_J', 'Keyboard j and J'),
    O_enum_value(0x0e, 'KEY_K', 'Keyboard k and K'),
    O_enum_value(0x0f, 'KEY_L', 'Keyboard l and L'),
    O_enum_value(0x10, 'KEY_M', 'Keyboard m and M'),
    O_enum_value(0x11, 'KEY_N', 'Keyboard n and N'),
    O_enum_value(0x12, 'KEY_O', 'Keyboard o and O'),
    O_enum_value(0x13, 'KEY_P', 'Keyboard p and P'),
    O_enum_value(0x14, 'KEY_Q', 'Keyboard q and Q'),
    O_enum_value(0x15, 'KEY_R', 'Keyboard r and R'),
    O_enum_value(0x16, 'KEY_S', 'Keyboard s and S'),
    O_enum_value(0x17, 'KEY_T', 'Keyboard t and T'),
    O_enum_value(0x18, 'KEY_U', 'Keyboard u and U'),
    O_enum_value(0x19, 'KEY_V', 'Keyboard v and V'),
    O_enum_value(0x1a, 'KEY_W', 'Keyboard w and W'),
    O_enum_value(0x1b, 'KEY_X', 'Keyboard x and X'),
    O_enum_value(0x1c, 'KEY_Y', 'Keyboard y and Y'),
    O_enum_value(0x1d, 'KEY_Z', 'Keyboard z and Z'),
    O_enum_value(0x1e, 'KEY_1', 'Keyboard 1 and !'),
    O_enum_value(0x1f, 'KEY_2', 'Keyboard 2 and @'),
    O_enum_value(0x20, 'KEY_3', 'Keyboard 3 and #'),
    O_enum_value(0x21, 'KEY_4', 'Keyboard 4 and $'),
    O_enum_value(0x22, 'KEY_5', 'Keyboard 5 and %'),
    O_enum_value(0x23, 'KEY_6', 'Keyboard 6 and ^'),
    O_enum_value(0x24, 'KEY_7', 'Keyboard 7 and &'),
    O_enum_value(0x25, 'KEY_8', 'Keyboard 8 and *'),
    O_enum_value(0x26, 'KEY_9', 'Keyboard 9 and ('),
    O_enum_value(0x27, 'KEY_0', 'Keyboard 0 and )'),
    O_enum_value(0x28, 'KEY_ENTER', 'Keyboard Return (ENTER)'),
    O_enum_value(0x29, 'KEY_ESC', 'Keyboard ESCAPE'),
    O_enum_value(0x2a, 'KEY_BACKSPACE', 'Keyboard DELETE (Backspace)'),
    O_enum_value(0x2b, 'KEY_TAB', 'Keyboard Tab'),
    O_enum_value(0x2c, 'KEY_SPACE', 'Keyboard Spacebar'),
    O_enum_value(0x2d, 'KEY_MINUS', 'Keyboard - and _'),
    O_enum_value(0x2e, 'KEY_EQUAL', 'Keyboard = and +'),
    O_enum_value(0x2f, 'KEY_LEFTBRACE', 'Keyboard [ and {'),
    O_enum_value(0x30, 'KEY_RIGHTBRACE', 'Keyboard ] and }'),
    O_enum_value(0x31, 'KEY_BACKSLASH', 'Keyboard \ and |'),
    O_enum_value(0x32, 'KEY_HASHTILDE', 'Keyboard Non-US # and ~'),
    O_enum_value(0x33, 'KEY_SEMICOLON', 'Keyboard ; and :'),
    O_enum_value(0x34, 'KEY_APOSTROPHE', 'Keyboard \' and "'),
    O_enum_value(0x35, 'KEY_GRAVE', 'Keyboard ` and ~'),
    O_enum_value(0x36, 'KEY_COMMA', 'Keyboard , and <'),
    O_enum_value(0x37, 'KEY_DOT', 'Keyboard . and >'),
    O_enum_value(0x38, 'KEY_SLASH', 'Keyboard / and ?'),
    O_enum_value(0x39, 'KEY_CAPSLOCK', 'Keyboard Caps Lock'),
    O_enum_value(0x3a, 'KEY_F1', 'Keyboard F1'),
    O_enum_value(0x3b, 'KEY_F2', 'Keyboard F2'),
    O_enum_value(0x3c, 'KEY_F3', 'Keyboard F3'),
    O_enum_value(0x3d, 'KEY_F4', 'Keyboard F4'),
    O_enum_value(0x3e, 'KEY_F5', 'Keyboard F5'),
    O_enum_value(0x3f, 'KEY_F6', 'Keyboard F6'),
    O_enum_value(0x40, 'KEY_F7', 'Keyboard F7'),
    O_enum_value(0x41, 'KEY_F8', 'Keyboard F8'),
    O_enum_value(0x42, 'KEY_F9', 'Keyboard F9'),
    O_enum_value(0x43, 'KEY_F10', 'Keyboard F10'),
    O_enum_value(0x44, 'KEY_F11', 'Keyboard F11'),
    O_enum_value(0x45, 'KEY_F12', 'Keyboard F12'),
    O_enum_value(0x46, 'KEY_SYSRQ', 'Keyboard Print Screen'),
    O_enum_value(0x47, 'KEY_SCROLLLOCK', 'Keyboard Scroll Lock'),
    O_enum_value(0x48, 'KEY_PAUSE', 'Keyboard Pause'),
    O_enum_value(0x49, 'KEY_INSERT', 'Keyboard Insert'),
    O_enum_value(0x4a, 'KEY_HOME', 'Keyboard Home'),
    O_enum_value(0x4b, 'KEY_PAGEUP', 'Keyboard Page Up'),
    O_enum_value(0x4c, 'KEY_DELETE', 'Keyboard Delete Forward'),
    O_enum_value(0x4d, 'KEY_END', 'Keyboard End'),
    O_enum_value(0x4e, 'KEY_PAGEDOWN', 'Keyboard Page Down'),
    O_enum_value(0x4f, 'KEY_RIGHT', 'Keyboard Right Arrow'),
    O_enum_value(0x50, 'KEY_LEFT', 'Keyboard Left Arrow'),
    O_enum_value(0x51, 'KEY_DOWN', 'Keyboard Down Arrow'),
    O_enum_value(0x52, 'KEY_UP', 'Keyboard Up Arrow'),
    O_enum_value(0x53, 'KEY_NUMLOCK', 'Keyboard Num Lock and Clear'),
    O_enum_value(0x54, 'KEY_KPSLASH', 'Keypad /'),
    O_enum_value(0x55, 'KEY_KPASTERISK', 'Keypad *'),
    O_enum_value(0x56, 'KEY_KPMINUS', 'Keypad -'),
    O_enum_value(0x57, 'KEY_KPPLUS', 'Keypad +'),
    O_enum_value(0x58, 'KEY_KPENTER', 'Keypad ENTER'),
    O_enum_value(0x59, 'KEY_KP1', 'Keypad 1 and End'),
    O_enum_value(0x5a, 'KEY_KP2', 'Keypad 2 and Down Arrow'),
    O_enum_value(0x5b, 'KEY_KP3', 'Keypad 3 and PageDn'),
    O_enum_value(0x5c, 'KEY_KP4', 'Keypad 4 and Left Arrow'),
    O_enum_value(0x5d, 'KEY_KP5', 'Keypad 5'),
    O_enum_value(0x5e, 'KEY_KP6', 'Keypad 6 and Right Arrow'),
    O_enum_value(0x5f, 'KEY_KP7', 'Keypad 7 and Home'),
    O_enum_value(0x60, 'KEY_KP8', 'Keypad 8 and Up Arrow'),
    O_enum_value(0x61, 'KEY_KP9', 'Keypad 9 and Page Up'),
    O_enum_value(0x62, 'KEY_KP0', 'Keypad 0 and Insert'),
    O_enum_value(0x63, 'KEY_KPDOT', 'Keypad . and Delete'),
    O_enum_value(0x64, 'KEY_102ND', 'Keyboard Non-US \\ and |'),
    O_enum_value(0x65, 'KEY_COMPOSE', 'Keyboard Application'),
    O_enum_value(0x66, 'KEY_POWER', 'Keyboard Power'),
    O_enum_value(0x67, 'KEY_KPEQUAL', 'Keypad ='),
    O_enum_value(0x68, 'KEY_F13', 'Keyboard F13'),
    O_enum_value(0x69, 'KEY_F14', 'Keyboard F14'),
    O_enum_value(0x6a, 'KEY_F15', 'Keyboard F15'),
    O_enum_value(0x6b, 'KEY_F16', 'Keyboard F16'),
    O_enum_value(0x6c, 'KEY_F17', 'Keyboard F17'),
    O_enum_value(0x6d, 'KEY_F18', 'Keyboard F18'),
    O_enum_value(0x6e, 'KEY_F19', 'Keyboard F19'),
    O_enum_value(0x6f, 'KEY_F20', 'Keyboard F20'),
    O_enum_value(0x70, 'KEY_F21', 'Keyboard F21'),
    O_enum_value(0x71, 'KEY_F22', 'Keyboard F22'),
    O_enum_value(0x72, 'KEY_F23', 'Keyboard F23'),
    O_enum_value(0x73, 'KEY_F24', 'Keyboard F24'),
    O_enum_value(0x74, 'KEY_OPEN', 'Keyboard Execute'),
    O_enum_value(0x75, 'KEY_HELP', 'Keyboard Help'),
    O_enum_value(0x76, 'KEY_PROPS', 'Keyboard Menu'),
    O_enum_value(0x77, 'KEY_FRONT', 'Keyboard Select'),
    O_enum_value(0x78, 'KEY_STOP', 'Keyboard Stop'),
    O_enum_value(0x79, 'KEY_AGAIN', 'Keyboard Again'),
    O_enum_value(0x7a, 'KEY_UNDO', 'Keyboard Undo'),
    O_enum_value(0x7b, 'KEY_CUT', 'Keyboard Cut'),
    O_enum_value(0x7c, 'KEY_COPY', 'Keyboard Copy'),
    O_enum_value(0x7d, 'KEY_PASTE', 'Keyboard Paste'),
    O_enum_value(0x7e, 'KEY_FIND', 'Keyboard Find'),
    O_enum_value(0x7f, 'KEY_MUTE', 'Keyboard Mute'),
    O_enum_value(0x80, 'KEY_VOLUMEUP', 'Keyboard Volume Up'),
    O_enum_value(0x81, 'KEY_VOLUMEDOWN', 'Keyboard Volume Down'),
    O_enum_value(0x85, 'KEY_KPCOMMA', 'Keypad Comma'),
    O_enum_value(0x87, 'KEY_RO', 'Keyboard International1'),
    O_enum_value(0x88, 'KEY_KATAKANAHIRAGANA', 'Keyboard International2'),
    O_enum_value(0x89, 'KEY_YEN', 'Keyboard International3'),
    O_enum_value(0x8a, 'KEY_HENKAN', 'Keyboard International4'),
    O_enum_value(0x8b, 'KEY_MUHENKAN', 'Keyboard International5'),
    O_enum_value(0x8c, 'KEY_KPJPCOMMA', 'Keyboard International6'),
    O_enum_value(0x90, 'KEY_HANGEUL', 'Keyboard LANG1'),
    O_enum_value(0x91, 'KEY_HANJA', 'Keyboard LANG2'),
    O_enum_value(0x92, 'KEY_KATAKANA', 'Keyboard LANG3'),
    O_enum_value(0x93, 'KEY_HIRAGANA', 'Keyboard LANG4'),
    O_enum_value(0x94, 'KEY_ZENKAKUHANKAKU', 'Keyboard LANG5'),
    O_enum_value(0xb6, 'KEY_KPLEFTPAREN', 'Keypad ('),
    O_enum_value(0xb7, 'KEY_KPRIGHTPAREN', 'Keypad )'),
    O_enum_value(0xe0, 'KEY_LEFTCTRL', 'Keyboard Left Control'),
    O_enum_value(0xe1, 'KEY_LEFTSHIFT', 'Keyboard Left Shift'),
    O_enum_value(0xe2, 'KEY_LEFTALT', 'Keyboard Left Alt'),
    O_enum_value(0xe3, 'KEY_LEFTMETA', 'Keyboard Left GUI'),
    O_enum_value(0xe4, 'KEY_RIGHTCTRL', 'Keyboard Right Control'),
    O_enum_value(0xe5, 'KEY_RIGHTSHIFT', 'Keyboard Right Shift'),
    O_enum_value(0xe6, 'KEY_RIGHTALT', 'Keyboard Right Alt'),
    O_enum_value(0xe7, 'KEY_RIGHTMETA', 'Keyboard Right GUI'),
    O_enum_value(0xe8, 'KEY_MEDIA_PLAYPAUSE', 'Media Play Pause'),
    O_enum_value(0xe9, 'KEY_MEDIA_STOPCD', 'Media Stop CD'),
    O_enum_value(0xea, 'KEY_MEDIA_PREVIOUSSONG', 'Media Previous Song'),
    O_enum_value(0xeb, 'KEY_MEDIA_NEXTSONG', 'Media Next Song'),
    O_enum_value(0xec, 'KEY_MEDIA_EJECTCD', 'Media Eject CD'),
    O_enum_value(0xed, 'KEY_MEDIA_VOLUMEUP', 'Media Volume Up'),
    O_enum_value(0xee, 'KEY_MEDIA_VOLUMEDOWN', 'Media Volume Down'),
    O_enum_value(0xef, 'KEY_MEDIA_MUTE', 'Media Mute'),
    O_enum_value(0xf0, 'KEY_MEDIA_WWW', 'Media WWW'),
    O_enum_value(0xf1, 'KEY_MEDIA_BACK', 'Media Back'),
    O_enum_value(0xf2, 'KEY_MEDIA_FORWARD', 'Media Forward'),
    O_enum_value(0xf3, 'KEY_MEDIA_STOP', 'Media Stop'),
    O_enum_value(0xf4, 'KEY_MEDIA_FIND', 'Media Find'),
    O_enum_value(0xf5, 'KEY_MEDIA_SCROLLUP', 'Media Scroll Up'),
    O_enum_value(0xf6, 'KEY_MEDIA_SCROLLDOWN', 'Media Scroll Down'),
    O_enum_value(0xf7, 'KEY_MEDIA_EDIT', 'Media Edit'),
    O_enum_value(0xf8, 'KEY_MEDIA_SLEEP', 'Media Sleep'),
    O_enum_value(0xf9, 'KEY_MEDIA_COFFEE', 'Media Coffee'),
    O_enum_value(0xfa, 'KEY_MEDIA_REFRESH', 'Media Refresh'),
    O_enum_value(0xfb, 'KEY_MEDIA_CALC', 'Media Calculator')
]


a_o_input_device = [
    o_input_device_shenzhen_shanwan_android_gamepad, 
    O_input_device(
        'Roccat Kone XTD Mouse', 
        # 0,
        # 0,
        7805,
        11810,
        [
            O_input_sensor(
                'u8',  s_padding_or_not_found_out_yet,
            ),
            O_input_sensor(
                'u1', 'left_button', 
            ),
            O_input_sensor(
                'u1', 'right_button', 
            ),
            O_input_sensor(
                'u1', 'middle_button', 
            ),
            O_input_sensor(
                'u1', 'side_button_back', 
            ),
            O_input_sensor(
                'u1', 'side_button_front', 
            ),
            O_input_sensor(
                'u3',  s_padding_or_not_found_out_yet,
            ),
            O_input_sensor(
                'i8', 'x_axis_value',
            ),
            O_input_sensor(
                'u8', 'x_axis_direction',
            ),
            O_input_sensor(
                'i8', 'y_axis_value',
            ),
            O_input_sensor(
                'u8', 'y_axis_direction',
            ),
            O_input_sensor(
                'i8', 'mouse_wheel',
            ),
        ], 
    ), 
        O_input_device(
        'Logitech keyboard K120', 
        # 0,
        # 0,
        1133,
        49948,
        [
            O_input_sensor(
                'u1', 'control_left', 
            ),
            O_input_sensor(
                'u1', 'shift_left', 
            ),
            O_input_sensor(
                'u1', 'alt_left', 
            ),
            O_input_sensor(
                'u1', 'super_left', 
            ),
            O_input_sensor(
                'u1', 'control_right', 
            ),
            O_input_sensor(
                'u1', 'shift_right', 
            ),
            O_input_sensor(
                'u1', 'alt_right', 
            ),
            O_input_sensor(
                'u1', 'super_right', 
            ),
            O_input_sensor(
                'u8',  s_padding_or_not_found_out_yet,
            ),
            O_input_sensor(
                'u8',  'keydown_1', a_o_enum_value__keys
            ),
            O_input_sensor(
                'u8',  'keydown_2', a_o_enum_value__keys
            ),
            O_input_sensor(
                'u8',  'keydown_3', a_o_enum_value__keys
            ),
            O_input_sensor(
                'u8',  'keydown_4', a_o_enum_value__keys
            ),
            O_input_sensor(
                'u8',  'keydown_5', a_o_enum_value__keys
            ),
            O_input_sensor(
                'u8',  'keydown_6', a_o_enum_value__keys
            ),

        ], 
    )
    
]


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
        0x045e,
        0x028e,
        # o_device['vendor_id'],
        # o_device['product_id'],
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