# import hid  # Import the HID package
import time  # Import time for high-resolution timing

# Start time in microseconds
start_time = time.perf_counter_ns() // 1000

# Your operation
a_o = []
class O_test:
    def __init__(self, v1, v2, v3):
        self.v1 = v1
        self.v2 = v2
        self.v3 = v3

# Simulate some operation
for i in range(123123):
    a_o.append(O_test(1, 'asdf', {'n': "2"}))

# End time in microseconds
end_time = time.perf_counter_ns() // 1000

# Calculate duration in microseconds
duration_in_microseconds = end_time - start_time

print(f"Operation duration in microseconds: {duration_in_microseconds}")