// install libusb
// build with link 
//gcc -o c_read_usb c_read_usb.c -lusb-1.0
#define BYTE_TO_BINARY_PATTERN "%c%c%c%c%c%c%c%c"
#define BYTE_TO_BINARY(byte)  \
  ((byte) & 0x80 ? '1' : '0'), \
  ((byte) & 0x40 ? '1' : '0'), \
  ((byte) & 0x20 ? '1' : '0'), \
  ((byte) & 0x10 ? '1' : '0'), \
  ((byte) & 0x08 ? '1' : '0'), \
  ((byte) & 0x04 ? '1' : '0'), \
  ((byte) & 0x02 ? '1' : '0'), \
  ((byte) & 0x01 ? '1' : '0') 

#include <stdio.h>
#include <stdlib.h>
#include <libusb-1.0/libusb.h>

#define VENDOR_ID_gamepad  0x2563
#define PRODUCT_ID_gamepad  0x0526

#define VENDOR_ID  VENDOR_ID_gamepad
#define PRODUCT_ID  PRODUCT_ID_gamepad

int main() {
    libusb_device_handle *handle = NULL;
    int err = 0;

    // Initialize libusb
    err = libusb_init(NULL);
    if (err) {
        fprintf(stderr, "Error initializing libusb: %s\n", libusb_error_name(err));
        return -1;
    }

    // Open the device
    handle = libusb_open_device_with_vid_pid(NULL, VENDOR_ID, PRODUCT_ID);
    if (!handle) {
        fprintf(stderr, "Could not find/open device\n");
        libusb_exit(NULL);
        return -1;
    }
    printf("Device opened\n");

    // Claim interface 0
    err = libusb_claim_interface(handle, 0);
    if (err) {
        fprintf(stderr, "Could not claim interface 0: %s\n", libusb_error_name(err));
        libusb_close(handle);
        libusb_exit(NULL);
        return -1;
    }

    // Prepare for reading data
    unsigned char data[32]; // Match the max packet size
    int actual_length;
    for(int n = 0; n < 1000;n+=1){
            
        err = libusb_interrupt_transfer(handle, 0x81, data, sizeof(data), &actual_length, 5000); // 5000 ms timeout
        if (err) {
            fprintf(stderr, "Read error: %s\n", libusb_error_name(err));
        } else {
            // printf("Read %d bytes: ", actual_length);
            printf("===========\n");

            for(int i = 0; i < actual_length; ++i) {
                // printf("%02x ", data[i]);
                printf("%2d "BYTE_TO_BINARY_PATTERN "\n", i, BYTE_TO_BINARY(data[i]));
            }
            printf("\n");
        }
    }


    // Release the interface and close everything
    libusb_release_interface(handle, 0);
    libusb_close(handle);
    libusb_exit(NULL);

    return 0;
}