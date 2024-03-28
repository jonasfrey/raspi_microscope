import time

# Start the timer
start = time.perf_counter()
print(time.perf_counter())
time.sleep(1.2)
print(time.perf_counter())


# Do something that takes time
for _ in range(1000000):
    pass  # This loop is just a placeholder for your operation

# End the timer
end = time.perf_counter()

# Calculate and print the elapsed time in microseconds
elapsed_microseconds = (end - start) * 1_000_000
print(f"Elapsed time: {elapsed_microseconds} microseconds")