# Multitouch

    identifier: 0x18d55e2b
    extends: sensor

A capacitive touch sensor with multiple inputs.

## Registers

    ro capacity: i32[] @ reading

Capacitance of channels. The capacitance is continuously calibrated, and a value of `0` indicates
no touch, wheres a value of around `100` or more indicates touch.
It's best to ignore this (unless debugging), and use events.

## Events

Most events include the channel number of the input.

    event touch { channel: u32 } @ 0x01

Emitted when an input is touched.

    event release { channel: u32 } @ 0x02

Emitted when an input is no longer touched.

    event tap { channel: u32 } @ 0x03

Emitted when an input is briefly touched. TODO Not implemented.

    event long_press { channel: u32 } @ 0x04

Emitted when an input is touched for longer than 500ms. TODO Not implemented.

    event swipe_pos @ 0x10

Emitted when input channels are successively touched in order of increasing channel numbers.

    event swipe_neg @ 0x11

Emitted when input channels are successively touched in order of decreasing channel numbers.
