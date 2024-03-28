import RPi.GPIO as GPIO
import time


# Set up GPIO numbering based on Broadcom SOC channel
GPIO.setmode(GPIO.BCM)


s_stepping_mode__full = 'full'
s_stepping_mode__dual_phase_full = 'dual_phase_full'
s_stepping_mode__half = 'half'

class O_stepper_28BYJ_48:
    def __init__(
        self,
        a_n_pin_number, 
        n_speed_snor = 0,
        n_b_direction = 1,
        n_rpm_max = 1,
        n_rpm_min = 0,
        s_stepping_mode = s_stepping_mode__full
    ):
        self.a_n_pin_number = a_n_pin_number
        self.a_n_pin_voltage = [0 for n in a_n_pin_number]
        self.n_rpm = 0
        self.n_speed_snor = n_speed_snor
        self.n_b_direction = n_b_direction
        self.n_rpm_max = n_rpm_max
        self.n_rpm_min = n_rpm_min
        self.n_idx_a_n_pin_number = 0
        self.s_stepping_mode = s_stepping_mode
        self.n_mic_sec_last_step = 0
        self.n_steps_per_round = 2038
        self.n_mic_sec_between_steps = 0
        # stepping modes
        # full stepping 
        # [1,0,0,0]
        # [0,1,0,0]
        # [0,0,1,0]
        # [0,0,0,1]
        # dual phase stepping 
        # [1,1,0,0]
        # [0,1,1,0]
        # [0,0,1,1]
        # [1,0,0,1]
        # stepping modes
        # half stepping 
        # [1,0,0,0]
        # [1,1,0,0]
        # [0,1,0,0]
        # [0,1,1,0]
        # [0,0,1,0]
        # [0,0,1,1]
        # [0,0,0,1]
        # [1,0,0,1]
        for n in a_n_pin_number:
            GPIO.setup(n, GPIO.OUT)

def f_update_speed_calculation(o_stepper):
    o_stepper.n_rpm = abs(o_stepper.n_speed_snor) * o_stepper.n_rpm_max
    o_stepper.n_mic_sec_between_steps = 60*1000*1000/o_stepper.n_rpm*o_stepper.n_steps_per_round

def f_check_and_potentially_step(o_stepper):
    # Start the timer
    f_update_speed_calculation()
    n_mic_sec = time.perf_counter()*1000*1000
    n_mic_sec_diff = abs(o_stepper.n_mic_sec_last_step - n_mic_sec)

    if(n_mic_sec_diff > o_stepper.n_mic_sec_between_steps):
        f_step(o_stepper)

def f_step(o_stepper): 
    if(o_stepper.n_speed_snor > 0):
        o_stepper.n_b_direction = 1
    else:
        o_stepper.n_b_direction = -1
    n_add = int(o_stepper.n_b_direction)
    n_len = len(o_stepper.a_n_pin_number)
    o_stepper.n_idx_a_n_pin_number = (o_stepper.n_idx_a_n_pin_number+n_add)%n_len

    o_stepper.n_mic_sec_last_step = time.perf_counter()*1000*1000
    if(o_stepper.n_idx_a_n_pin_number < 0):
        o_stepper.n_idx_a_n_pin_number = n_len
    