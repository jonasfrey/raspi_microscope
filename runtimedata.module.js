import {
    O_enum_value,
    O_input_sensor,
    O_input_device
} from "./classes.module.js"

let s_padding_or_not_found_out_yet = 'padding_or_not_found_out_yet'

let o_input_device_shenzhen_shanwan_android_gamepad = new O_input_device(
    'ShenZhen ShanWan Technology Co., Ltd. Android Gamepad', 
    9571,
    1318,
    [
        new O_input_sensor(
            'u8',  s_padding_or_not_found_out_yet,
        ),
        new O_input_sensor(
            'i8', 'left_x_axis', 
        ),
        new O_input_sensor(
            'i8', 'left_y_axis', 
        ),
        new O_input_sensor(
            'i8', 'right_x_axis', 
        ),
        new O_input_sensor(
            'i8', 'right_y_axis', 
        ),
        new O_input_sensor(
            'u8', 'd_pad_values', 
            [
                'up', 
                'up_right', 
                'right', 
                'right_down',
                'down', 
                'down_left',
                'left', 
                'left_up', 
                'up', 
                'none'
            ].map((s, n_idx)=>{
                let o = new O_enum_value(
                    n_idx, 
                    s, 
                )
                return o
                // console.log(o)
            })
            // [
            //     ...new Array(255).fill(0).map(
            //         (n_idx, n)=>{
            //             return n_idx.toString()
            //         }
            //     )
            // ]
        ),
        new O_input_sensor(
            'u1', 'A', 
        ),
        new O_input_sensor(
            'u1', 'B', 
        ),
        new O_input_sensor(
            'u1',  s_padding_or_not_found_out_yet, 
        ),
        new O_input_sensor(
            'u1', 'X', 
        ),
        new O_input_sensor(
            'u1', 'Y', 
        ),
        new O_input_sensor(
            'u1',  s_padding_or_not_found_out_yet, 
        ),
        new O_input_sensor(
            'u1', 'L1', 
        ),
        new O_input_sensor(
            'u1', 'R1', 
        ),
        
        new O_input_sensor(
            'u1', 'L2_pressed', 
        ),
        new O_input_sensor(
            'u1', 'R2_pressed', 
        ),
        new O_input_sensor(
            'u1', 'back_select', 
        ),
        new O_input_sensor(
            'u1', 'Start', 
        ),
        new O_input_sensor(
            'u1',  s_padding_or_not_found_out_yet, 
        ),
        new O_input_sensor(
            'u1', "L3", 
        ),
        new O_input_sensor(
            'u1', 'R3', 
        ),
        new O_input_sensor(
            'u1',  s_padding_or_not_found_out_yet, 
        ),
        new O_input_sensor(
            'u8', 'R2_intensity', 
        ),
        new O_input_sensor(
            'u8', 'L2_intensity', 
        ),
    ]
)

let o_input_device__Xbox360_Controller = new O_input_device(
    //Bus 003 Device 063: ID 045e:028e Microsoft Corp. Xbox360 Controller
    'Microsoft Corp. Xbox360 Controller', 
    0x045e,
    0x028e,
    [
        new O_input_sensor(
            'u8',  s_padding_or_not_found_out_yet,
        ),
        new O_input_sensor(
            'u8',  s_padding_or_not_found_out_yet,
        ),
        new O_input_sensor('u1',  'd_pad_up'),
        new O_input_sensor('u1',  'd_pad_down'),
        new O_input_sensor('u1',  'd_pad_left'),
        new O_input_sensor('u1',  'd_pad_right'),
        new O_input_sensor('u1',  'start'),
        new O_input_sensor('u1',  'select'),
        new O_input_sensor('u1',  'l3'),
        new O_input_sensor('u1',  'r3'),
        new O_input_sensor('u1',  'l1'),
        new O_input_sensor('u1',  'r1'),
        new O_input_sensor('u1',  s_padding_or_not_found_out_yet),
        new O_input_sensor('u1',  'analog_button'),
        new O_input_sensor('u1',  'x_button'),
        new O_input_sensor('u1',  'o_button'),
        new O_input_sensor('u1',  'suqare_button'),
        new O_input_sensor('u1',  'triangle_button'),
        new O_input_sensor('u8',  'l2_intensity'),
        new O_input_sensor('u8',  'r2_intensity'),
        new O_input_sensor('i16',  'left_x_axis'),
        new O_input_sensor('i16',  'left_y_axis'),
        new O_input_sensor('i16',  'right_x_axis'),
        new O_input_sensor('i16',  'right_y_axis'),
        
    ]
)


let a_o_enum_value__keys = [
    
    // # new O_enum_value(0x00, 'KEY_none', 'No key pressed'), 
    new O_enum_value(0x01, 'KEY_ERR_OVF', 'keyboard error roll over overflow to many keys are pressed'), 
    new O_enum_value(0x02, 'keyboard_post_fail', ''), 
    new O_enum_value(0x03, 'keyboard_error_undefined', ''), 
    new O_enum_value(0x04, 'KEY_A', 'Keyboard a and A'), 
    new O_enum_value(0x05, 'KEY_B', 'Keyboard b and B'),
    new O_enum_value(0x06, 'KEY_C', 'Keyboard c and C'),
    new O_enum_value(0x07, 'KEY_D', 'Keyboard d and D'),
    new O_enum_value(0x08, 'KEY_E', 'Keyboard e and E'),
    new O_enum_value(0x09, 'KEY_F', 'Keyboard f and F'),
    new O_enum_value(0x0a, 'KEY_G', 'Keyboard g and G'),
    new O_enum_value(0x0b, 'KEY_H', 'Keyboard h and H'),
    new O_enum_value(0x0c, 'KEY_I', 'Keyboard i and I'),
    new O_enum_value(0x0d, 'KEY_J', 'Keyboard j and J'),
    new O_enum_value(0x0e, 'KEY_K', 'Keyboard k and K'),
    new O_enum_value(0x0f, 'KEY_L', 'Keyboard l and L'),
    new O_enum_value(0x10, 'KEY_M', 'Keyboard m and M'),
    new O_enum_value(0x11, 'KEY_N', 'Keyboard n and N'),
    new O_enum_value(0x12, 'KEY_O', 'Keyboard o and O'),
    new O_enum_value(0x13, 'KEY_P', 'Keyboard p and P'),
    new O_enum_value(0x14, 'KEY_Q', 'Keyboard q and Q'),
    new O_enum_value(0x15, 'KEY_R', 'Keyboard r and R'),
    new O_enum_value(0x16, 'KEY_S', 'Keyboard s and S'),
    new O_enum_value(0x17, 'KEY_T', 'Keyboard t and T'),
    new O_enum_value(0x18, 'KEY_U', 'Keyboard u and U'),
    new O_enum_value(0x19, 'KEY_V', 'Keyboard v and V'),
    new O_enum_value(0x1a, 'KEY_W', 'Keyboard w and W'),
    new O_enum_value(0x1b, 'KEY_X', 'Keyboard x and X'),
    new O_enum_value(0x1c, 'KEY_Y', 'Keyboard y and Y'),
    new O_enum_value(0x1d, 'KEY_Z', 'Keyboard z and Z'),
    new O_enum_value(0x1e, 'KEY_1', 'Keyboard 1 and !'),
    new O_enum_value(0x1f, 'KEY_2', 'Keyboard 2 and @'),
    new O_enum_value(0x20, 'KEY_3', 'Keyboard 3 and #'),
    new O_enum_value(0x21, 'KEY_4', 'Keyboard 4 and $'),
    new O_enum_value(0x22, 'KEY_5', 'Keyboard 5 and %'),
    new O_enum_value(0x23, 'KEY_6', 'Keyboard 6 and ^'),
    new O_enum_value(0x24, 'KEY_7', 'Keyboard 7 and &'),
    new O_enum_value(0x25, 'KEY_8', 'Keyboard 8 and *'),
    new O_enum_value(0x26, 'KEY_9', 'Keyboard 9 and ('),
    new O_enum_value(0x27, 'KEY_0', 'Keyboard 0 and )'),
    new O_enum_value(0x28, 'KEY_ENTER', 'Keyboard Return (ENTER)'),
    new O_enum_value(0x29, 'KEY_ESC', 'Keyboard ESCAPE'),
    new O_enum_value(0x2a, 'KEY_BACKSPACE', 'Keyboard DELETE (Backspace)'),
    new O_enum_value(0x2b, 'KEY_TAB', 'Keyboard Tab'),
    new O_enum_value(0x2c, 'KEY_SPACE', 'Keyboard Spacebar'),
    new O_enum_value(0x2d, 'KEY_MINUS', 'Keyboard - and _'),
    new O_enum_value(0x2e, 'KEY_EQUAL', 'Keyboard = and +'),
    new O_enum_value(0x2f, 'KEY_LEFTBRACE', 'Keyboard [ and {'),
    new O_enum_value(0x30, 'KEY_RIGHTBRACE', 'Keyboard ] and }'),
    new O_enum_value(0x31, 'KEY_BACKSLASH', 'Keyboard \ and |'),
    new O_enum_value(0x32, 'KEY_HASHTILDE', 'Keyboard Non-US # and ~'),
    new O_enum_value(0x33, 'KEY_SEMICOLON', 'Keyboard ; and :'),
    new O_enum_value(0x34, 'KEY_APOSTROPHE', 'Keyboard \' and "'),
    new O_enum_value(0x35, 'KEY_GRAVE', 'Keyboard ` and ~'),
    new O_enum_value(0x36, 'KEY_COMMA', 'Keyboard , and <'),
    new O_enum_value(0x37, 'KEY_DOT', 'Keyboard . and >'),
    new O_enum_value(0x38, 'KEY_SLASH', 'Keyboard / and ?'),
    new O_enum_value(0x39, 'KEY_CAPSLOCK', 'Keyboard Caps Lock'),
    new O_enum_value(0x3a, 'KEY_F1', 'Keyboard F1'),
    new O_enum_value(0x3b, 'KEY_F2', 'Keyboard F2'),
    new O_enum_value(0x3c, 'KEY_F3', 'Keyboard F3'),
    new O_enum_value(0x3d, 'KEY_F4', 'Keyboard F4'),
    new O_enum_value(0x3e, 'KEY_F5', 'Keyboard F5'),
    new O_enum_value(0x3f, 'KEY_F6', 'Keyboard F6'),
    new O_enum_value(0x40, 'KEY_F7', 'Keyboard F7'),
    new O_enum_value(0x41, 'KEY_F8', 'Keyboard F8'),
    new O_enum_value(0x42, 'KEY_F9', 'Keyboard F9'),
    new O_enum_value(0x43, 'KEY_F10', 'Keyboard F10'),
    new O_enum_value(0x44, 'KEY_F11', 'Keyboard F11'),
    new O_enum_value(0x45, 'KEY_F12', 'Keyboard F12'),
    new O_enum_value(0x46, 'KEY_SYSRQ', 'Keyboard Print Screen'),
    new O_enum_value(0x47, 'KEY_SCROLLLOCK', 'Keyboard Scroll Lock'),
    new O_enum_value(0x48, 'KEY_PAUSE', 'Keyboard Pause'),
    new O_enum_value(0x49, 'KEY_INSERT', 'Keyboard Insert'),
    new O_enum_value(0x4a, 'KEY_HOME', 'Keyboard Home'),
    new O_enum_value(0x4b, 'KEY_PAGEUP', 'Keyboard Page Up'),
    new O_enum_value(0x4c, 'KEY_DELETE', 'Keyboard Delete Forward'),
    new O_enum_value(0x4d, 'KEY_END', 'Keyboard End'),
    new O_enum_value(0x4e, 'KEY_PAGEDOWN', 'Keyboard Page Down'),
    new O_enum_value(0x4f, 'KEY_RIGHT', 'Keyboard Right Arrow'),
    new O_enum_value(0x50, 'KEY_LEFT', 'Keyboard Left Arrow'),
    new O_enum_value(0x51, 'KEY_DOWN', 'Keyboard Down Arrow'),
    new O_enum_value(0x52, 'KEY_UP', 'Keyboard Up Arrow'),
    new O_enum_value(0x53, 'KEY_NUMLOCK', 'Keyboard Num Lock and Clear'),
    new O_enum_value(0x54, 'KEY_KPSLASH', 'Keypad /'),
    new O_enum_value(0x55, 'KEY_KPASTERISK', 'Keypad *'),
    new O_enum_value(0x56, 'KEY_KPMINUS', 'Keypad -'),
    new O_enum_value(0x57, 'KEY_KPPLUS', 'Keypad +'),
    new O_enum_value(0x58, 'KEY_KPENTER', 'Keypad ENTER'),
    new O_enum_value(0x59, 'KEY_KP1', 'Keypad 1 and End'),
    new O_enum_value(0x5a, 'KEY_KP2', 'Keypad 2 and Down Arrow'),
    new O_enum_value(0x5b, 'KEY_KP3', 'Keypad 3 and PageDn'),
    new O_enum_value(0x5c, 'KEY_KP4', 'Keypad 4 and Left Arrow'),
    new O_enum_value(0x5d, 'KEY_KP5', 'Keypad 5'),
    new O_enum_value(0x5e, 'KEY_KP6', 'Keypad 6 and Right Arrow'),
    new O_enum_value(0x5f, 'KEY_KP7', 'Keypad 7 and Home'),
    new O_enum_value(0x60, 'KEY_KP8', 'Keypad 8 and Up Arrow'),
    new O_enum_value(0x61, 'KEY_KP9', 'Keypad 9 and Page Up'),
    new O_enum_value(0x62, 'KEY_KP0', 'Keypad 0 and Insert'),
    new O_enum_value(0x63, 'KEY_KPDOT', 'Keypad . and Delete'),
    new O_enum_value(0x64, 'KEY_102ND', 'Keyboard Non-US \\ and |'),
    new O_enum_value(0x65, 'KEY_COMPOSE', 'Keyboard Application'),
    new O_enum_value(0x66, 'KEY_POWER', 'Keyboard Power'),
    new O_enum_value(0x67, 'KEY_KPEQUAL', 'Keypad ='),
    new O_enum_value(0x68, 'KEY_F13', 'Keyboard F13'),
    new O_enum_value(0x69, 'KEY_F14', 'Keyboard F14'),
    new O_enum_value(0x6a, 'KEY_F15', 'Keyboard F15'),
    new O_enum_value(0x6b, 'KEY_F16', 'Keyboard F16'),
    new O_enum_value(0x6c, 'KEY_F17', 'Keyboard F17'),
    new O_enum_value(0x6d, 'KEY_F18', 'Keyboard F18'),
    new O_enum_value(0x6e, 'KEY_F19', 'Keyboard F19'),
    new O_enum_value(0x6f, 'KEY_F20', 'Keyboard F20'),
    new O_enum_value(0x70, 'KEY_F21', 'Keyboard F21'),
    new O_enum_value(0x71, 'KEY_F22', 'Keyboard F22'),
    new O_enum_value(0x72, 'KEY_F23', 'Keyboard F23'),
    new O_enum_value(0x73, 'KEY_F24', 'Keyboard F24'),
    new O_enum_value(0x74, 'KEY_OPEN', 'Keyboard Execute'),
    new O_enum_value(0x75, 'KEY_HELP', 'Keyboard Help'),
    new O_enum_value(0x76, 'KEY_PROPS', 'Keyboard Menu'),
    new O_enum_value(0x77, 'KEY_FRONT', 'Keyboard Select'),
    new O_enum_value(0x78, 'KEY_STOP', 'Keyboard Stop'),
    new O_enum_value(0x79, 'KEY_AGAIN', 'Keyboard Again'),
    new O_enum_value(0x7a, 'KEY_UNDO', 'Keyboard Undo'),
    new O_enum_value(0x7b, 'KEY_CUT', 'Keyboard Cut'),
    new O_enum_value(0x7c, 'KEY_COPY', 'Keyboard Copy'),
    new O_enum_value(0x7d, 'KEY_PASTE', 'Keyboard Paste'),
    new O_enum_value(0x7e, 'KEY_FIND', 'Keyboard Find'),
    new O_enum_value(0x7f, 'KEY_MUTE', 'Keyboard Mute'),
    new O_enum_value(0x80, 'KEY_VOLUMEUP', 'Keyboard Volume Up'),
    new O_enum_value(0x81, 'KEY_VOLUMEDOWN', 'Keyboard Volume Down'),
    new O_enum_value(0x85, 'KEY_KPCOMMA', 'Keypad Comma'),
    new O_enum_value(0x87, 'KEY_RO', 'Keyboard International1'),
    new O_enum_value(0x88, 'KEY_KATAKANAHIRAGANA', 'Keyboard International2'),
    new O_enum_value(0x89, 'KEY_YEN', 'Keyboard International3'),
    new O_enum_value(0x8a, 'KEY_HENKAN', 'Keyboard International4'),
    new O_enum_value(0x8b, 'KEY_MUHENKAN', 'Keyboard International5'),
    new O_enum_value(0x8c, 'KEY_KPJPCOMMA', 'Keyboard International6'),
    new O_enum_value(0x90, 'KEY_HANGEUL', 'Keyboard LANG1'),
    new O_enum_value(0x91, 'KEY_HANJA', 'Keyboard LANG2'),
    new O_enum_value(0x92, 'KEY_KATAKANA', 'Keyboard LANG3'),
    new O_enum_value(0x93, 'KEY_HIRAGANA', 'Keyboard LANG4'),
    new O_enum_value(0x94, 'KEY_ZENKAKUHANKAKU', 'Keyboard LANG5'),
    new O_enum_value(0xb6, 'KEY_KPLEFTPAREN', 'Keypad ('),
    new O_enum_value(0xb7, 'KEY_KPRIGHTPAREN', 'Keypad )'),
    new O_enum_value(0xe0, 'KEY_LEFTCTRL', 'Keyboard Left Control'),
    new O_enum_value(0xe1, 'KEY_LEFTSHIFT', 'Keyboard Left Shift'),
    new O_enum_value(0xe2, 'KEY_LEFTALT', 'Keyboard Left Alt'),
    new O_enum_value(0xe3, 'KEY_LEFTMETA', 'Keyboard Left GUI'),
    new O_enum_value(0xe4, 'KEY_RIGHTCTRL', 'Keyboard Right Control'),
    new O_enum_value(0xe5, 'KEY_RIGHTSHIFT', 'Keyboard Right Shift'),
    new O_enum_value(0xe6, 'KEY_RIGHTALT', 'Keyboard Right Alt'),
    new O_enum_value(0xe7, 'KEY_RIGHTMETA', 'Keyboard Right GUI'),
    new O_enum_value(0xe8, 'KEY_MEDIA_PLAYPAUSE', 'Media Play Pause'),
    new O_enum_value(0xe9, 'KEY_MEDIA_STOPCD', 'Media Stop CD'),
    new O_enum_value(0xea, 'KEY_MEDIA_PREVIOUSSONG', 'Media Previous Song'),
    new O_enum_value(0xeb, 'KEY_MEDIA_NEXTSONG', 'Media Next Song'),
    new O_enum_value(0xec, 'KEY_MEDIA_EJECTCD', 'Media Eject CD'),
    new O_enum_value(0xed, 'KEY_MEDIA_VOLUMEUP', 'Media Volume Up'),
    new O_enum_value(0xee, 'KEY_MEDIA_VOLUMEDOWN', 'Media Volume Down'),
    new O_enum_value(0xef, 'KEY_MEDIA_MUTE', 'Media Mute'),
    new O_enum_value(0xf0, 'KEY_MEDIA_WWW', 'Media WWW'),
    new O_enum_value(0xf1, 'KEY_MEDIA_BACK', 'Media Back'),
    new O_enum_value(0xf2, 'KEY_MEDIA_FORWARD', 'Media Forward'),
    new O_enum_value(0xf3, 'KEY_MEDIA_STOP', 'Media Stop'),
    new O_enum_value(0xf4, 'KEY_MEDIA_FIND', 'Media Find'),
    new O_enum_value(0xf5, 'KEY_MEDIA_SCROLLUP', 'Media Scroll Up'),
    new O_enum_value(0xf6, 'KEY_MEDIA_SCROLLDOWN', 'Media Scroll Down'),
    new O_enum_value(0xf7, 'KEY_MEDIA_EDIT', 'Media Edit'),
    new O_enum_value(0xf8, 'KEY_MEDIA_SLEEP', 'Media Sleep'),
    new O_enum_value(0xf9, 'KEY_MEDIA_COFFEE', 'Media Coffee'),
    new O_enum_value(0xfa, 'KEY_MEDIA_REFRESH', 'Media Refresh'),
    new O_enum_value(0xfb, 'KEY_MEDIA_CALC', 'Media Calculator')
]


let a_o_input_device = [
    o_input_device_shenzhen_shanwan_android_gamepad, 
    o_input_device__Xbox360_Controller,
    new O_input_device(
        'Roccat Kone XTD Mouse', 
        // # 0,
        // # 0,
        7805,
        11810,
        [
            new O_input_sensor(
                'u8',  s_padding_or_not_found_out_yet,
            ),
            new O_input_sensor(
                'u1', 'left_button', 
            ),
            new O_input_sensor(
                'u1', 'right_button', 
            ),
            new O_input_sensor(
                'u1', 'middle_button', 
            ),
            new O_input_sensor(
                'u1', 'side_button_back', 
            ),
            new O_input_sensor(
                'u1', 'side_button_front', 
            ),
            new O_input_sensor(
                'u3',  s_padding_or_not_found_out_yet,
            ),
            new O_input_sensor(
                'i8', 'x_axis_value',
            ),
            new O_input_sensor(
                'u8', 'x_axis_direction',
            ),
            new O_input_sensor(
                'i8', 'y_axis_value',
            ),
            new O_input_sensor(
                'u8', 'y_axis_direction',
            ),
            new O_input_sensor(
                'i8', 'mouse_wheel',
            ),
        ], 
    ), 
        new O_input_device(
        'Logitech keyboard K120', 
        // # 0,
        // # 0,
        1133,
        49948,
        [
            new O_input_sensor(
                'u1', 'control_left', 
            ),
            new O_input_sensor(
                'u1', 'shift_left', 
            ),
            new O_input_sensor(
                'u1', 'alt_left', 
            ),
            new O_input_sensor(
                'u1', 'super_left', 
            ),
            new O_input_sensor(
                'u1', 'control_right', 
            ),
            new O_input_sensor(
                'u1', 'shift_right', 
            ),
            new O_input_sensor(
                'u1', 'alt_right', 
            ),
            new O_input_sensor(
                'u1', 'super_right', 
            ),
            new O_input_sensor(
                'u8',  s_padding_or_not_found_out_yet,
            ),
            new O_input_sensor(
                'u8',  'keydown_1', a_o_enum_value__keys
            ),
            new O_input_sensor(
                'u8',  'keydown_2', a_o_enum_value__keys
            ),
            new O_input_sensor(
                'u8',  'keydown_3', a_o_enum_value__keys
            ),
            new O_input_sensor(
                'u8',  'keydown_4', a_o_enum_value__keys
            ),
            new O_input_sensor(
                'u8',  'keydown_5', a_o_enum_value__keys
            ),
            new O_input_sensor(
                'u8',  'keydown_6', a_o_enum_value__keys
            ),

        ], 
    )
    
]
export { 
    s_padding_or_not_found_out_yet,
    o_input_device_shenzhen_shanwan_android_gamepad,
    a_o_input_device,
    a_o_enum_value__keys
}