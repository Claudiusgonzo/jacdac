/// <reference path="../spectool/jdspec.d.ts" />
export const serviceSpecifications: jdspec.ServiceSpec[] = [
  {
    "name": "Common registers and commands",
    "shortId": "_base",
    "camelName": "base",
    "shortName": "base",
    "extends": [],
    "notes": {
      "short": "Service specification will always list explicitly registers and commands defined here.\nThey can be listed with say `@ intensity` instead of `@ 0x01`.",
      "commands": "Command codes are subdivided as follows:\n* Commands `0x000-0x07f` - common to all services\n* Commands `0x080-0xeff` - defined per-service\n* Commands `0xf00-0xfff` - reserved for implementation\n\nCommands follow.",
      "registers": "Register codes are subdivided as follows:\n* Registers `0x001-0x07f` - r/w common to all services\n* Registers `0x080-0x0ff` - r/w defined per-service\n* Registers `0x100-0x17f` - r/o common to all services\n* Registers `0x180-0x1ff` - r/o defined per-service\n* Registers `0x200-0xeff` - custom, defined per-service\n* Registers `0xf00-0xfff` - reserved for implementation, should not be seen on the wire\n\nThe types listed are typical. Check spec for particular service for exact type,\nand a service-specific name for a register (eg. `value` could be `pulse_length`).\nAll registers default to `0` unless otherwise indicated."
    },
    "classIdentifier": 536870897,
    "enums": {},
    "packets": [
      {
        "kind": "command",
        "name": "announce",
        "identifier": 0,
        "description": "Enumeration data for control service; service-specific advertisement data otherwise.\nControl broadcasts it automatically every 500ms, but other service have to be queried to provide it.",
        "fields": []
      },
      {
        "kind": "report",
        "name": "announce",
        "identifier": 0,
        "description": "Enumeration data for control service; service-specific advertisement data otherwise.\nControl broadcasts it automatically every 500ms, but other service have to be queried to provide it.",
        "fields": []
      },
      {
        "kind": "command",
        "name": "get_register",
        "identifier": 4096,
        "description": "Registers number `N` is fetched by issuing command `0x1000 | N`.\nThe report format is the same as the format of the register.",
        "fields": []
      },
      {
        "kind": "report",
        "name": "get_register",
        "identifier": 4096,
        "description": "Registers number `N` is fetched by issuing command `0x1000 | N`.\nThe report format is the same as the format of the register.",
        "fields": []
      },
      {
        "kind": "command",
        "name": "set_register",
        "identifier": 8192,
        "description": "Registers number `N` is set by issuing command `0x2000 | N`, with the format\nthe same as the format of the register.",
        "fields": []
      },
      {
        "kind": "report",
        "name": "event",
        "identifier": 1,
        "description": "Event from sensor or a broadcast service.",
        "fields": [
          {
            "name": "event_id",
            "unit": "",
            "type": "u32",
            "storage": 4,
            "isSimpleType": true
          },
          {
            "name": "event_argument",
            "unit": "",
            "type": "u32",
            "storage": 4,
            "isSimpleType": true
          }
        ]
      },
      {
        "kind": "command",
        "name": "calibrate",
        "identifier": 2,
        "description": "Request to calibrate a sensor. The report indicates the calibration is done.",
        "fields": []
      },
      {
        "kind": "report",
        "name": "calibrate",
        "identifier": 2,
        "description": "Request to calibrate a sensor. The report indicates the calibration is done.",
        "fields": []
      },
      {
        "kind": "command",
        "name": "description",
        "identifier": 3,
        "description": "Request human-readable description of service.",
        "fields": []
      },
      {
        "kind": "report",
        "name": "description",
        "identifier": 3,
        "description": "Request human-readable description of service.",
        "fields": [
          {
            "name": "text",
            "unit": "",
            "type": "string",
            "storage": 0
          }
        ]
      },
      {
        "kind": "rw",
        "name": "intensity",
        "identifier": 1,
        "description": "This is either binary on/off (0 or non-zero), or can be gradual (eg. brightness of an RGB LED strip).",
        "fields": [
          {
            "name": "_",
            "unit": "",
            "type": "u32",
            "storage": 4,
            "isSimpleType": true
          }
        ]
      },
      {
        "kind": "rw",
        "name": "value",
        "identifier": 2,
        "description": "The primary value of actuator (eg. servo pulse length, or motor duty cycle).",
        "fields": [
          {
            "name": "_",
            "unit": "",
            "type": "i32",
            "storage": -4,
            "isSimpleType": true
          }
        ]
      },
      {
        "kind": "rw",
        "name": "max_power",
        "identifier": 7,
        "description": "Limit the power drawn by the service, in mA.",
        "fields": [
          {
            "name": "_",
            "unit": "mA",
            "type": "u16",
            "storage": 2,
            "isSimpleType": true,
            "defaultValue": 500
          }
        ]
      },
      {
        "kind": "rw",
        "name": "is_streaming",
        "identifier": 3,
        "description": "Enables/disables broadcast streaming",
        "fields": [
          {
            "name": "_",
            "unit": "",
            "type": "bool",
            "storage": 1
          }
        ]
      },
      {
        "kind": "rw",
        "name": "streaming_interval",
        "identifier": 4,
        "description": "Period between packets of data when streaming in milliseconds.",
        "fields": [
          {
            "name": "_",
            "unit": "ms",
            "type": "u32",
            "storage": 4,
            "isSimpleType": true,
            "defaultValue": 100
          }
        ]
      },
      {
        "kind": "ro",
        "name": "reading",
        "identifier": 257,
        "description": "Read-only value of the sensor, also reported in streaming.",
        "fields": [
          {
            "name": "_",
            "unit": "",
            "type": "i32",
            "storage": -4,
            "isSimpleType": true
          }
        ]
      },
      {
        "kind": "rw",
        "name": "low_threshold",
        "identifier": 5,
        "description": "Thresholds for event generation for event generation for analog sensors.",
        "fields": [
          {
            "name": "_",
            "unit": "",
            "type": "i32",
            "storage": -4,
            "isSimpleType": true
          }
        ]
      },
      {
        "kind": "rw",
        "name": "high_threshold",
        "identifier": 6,
        "description": "Thresholds for event generation for event generation for analog sensors.",
        "fields": [
          {
            "name": "_",
            "unit": "",
            "type": "i32",
            "storage": -4,
            "isSimpleType": true
          }
        ]
      }
    ],
    "source": "# Common registers and commands\n\n    camel: base\n\nService specification will always list explicitly registers and commands defined here.\nThey can be listed with say `@ intensity` instead of `@ 0x01`.\n\n## Commands\n\nCommand codes are subdivided as follows:\n* Commands `0x000-0x07f` - common to all services\n* Commands `0x080-0xeff` - defined per-service\n* Commands `0xf00-0xfff` - reserved for implementation\n\nCommands follow.\n\n    command announce @ 0x00 { }\n    report { ... }\n\nEnumeration data for control service; service-specific advertisement data otherwise.\nControl broadcasts it automatically every 500ms, but other service have to be queried to provide it.\n\n    command get_register @ 0x1000 {}\n    report { ... }\n\nRegisters number `N` is fetched by issuing command `0x1000 | N`.\nThe report format is the same as the format of the register.\n\n    command set_register @ 0x2000 { ... }\n\nRegisters number `N` is set by issuing command `0x2000 | N`, with the format\nthe same as the format of the register.\n\n    report event @ 0x01 {\n        event_id: u32\n        event_argument: u32\n    }\n\nEvent from sensor or a broadcast service. \n\n    command calibrate @ 0x02 { }\n    report { }\n\nRequest to calibrate a sensor. The report indicates the calibration is done.\n\n    command description @ 0x03 { }\n    report {\n        text: string\n    }\n\nRequest human-readable description of service.\n\n## Registers\n\nRegister codes are subdivided as follows:\n* Registers `0x001-0x07f` - r/w common to all services\n* Registers `0x080-0x0ff` - r/w defined per-service\n* Registers `0x100-0x17f` - r/o common to all services\n* Registers `0x180-0x1ff` - r/o defined per-service\n* Registers `0x200-0xeff` - custom, defined per-service\n* Registers `0xf00-0xfff` - reserved for implementation, should not be seen on the wire\n\nThe types listed are typical. Check spec for particular service for exact type,\nand a service-specific name for a register (eg. `value` could be `pulse_length`).\nAll registers default to `0` unless otherwise indicated.\n\n    rw intensity: u32 @ 0x01\n\nThis is either binary on/off (0 or non-zero), or can be gradual (eg. brightness of an RGB LED strip).\n\n    rw value: i32 @ 0x02\n\nThe primary value of actuator (eg. servo pulse length, or motor duty cycle).\n\n    rw max_power = 500: u16 mA @ 0x07\n\nLimit the power drawn by the service, in mA.\n\n    rw is_streaming: bool @ 0x03\n\nEnables/disables broadcast streaming\n\n    rw streaming_interval = 100: u32 ms @ 0x04\n\nPeriod between packets of data when streaming in milliseconds.\n\n    ro reading: i32 @ 0x101\n\nRead-only value of the sensor, also reported in streaming.\n\n    rw low_threshold: i32 @ 0x05\n    rw high_threshold: i32 @ 0x06\n\nThresholds for event generation for event generation for analog sensors.\n\n"
  },
  {
    "name": "Sensor",
    "shortId": "_sensor",
    "camelName": "sensor",
    "shortName": "sensor",
    "extends": [],
    "notes": {
      "short": "Base class for sensors."
    },
    "classIdentifier": 536870898,
    "enums": {},
    "packets": [
      {
        "kind": "rw",
        "name": "is_streaming",
        "identifier": 3,
        "description": "Enables/disables broadcast streaming",
        "fields": [
          {
            "name": "_",
            "unit": "",
            "type": "bool",
            "storage": 1
          }
        ],
        "identifierName": "is_streaming"
      },
      {
        "kind": "rw",
        "name": "streaming_interval",
        "identifier": 4,
        "description": "Period between packets of data when streaming in milliseconds.",
        "fields": [
          {
            "name": "_",
            "unit": "ms",
            "type": "u32",
            "storage": 4,
            "isSimpleType": true,
            "defaultValue": 100
          }
        ],
        "identifierName": "streaming_interval"
      }
    ],
    "source": "# Sensor\n\n    camel: sensor\n\nBase class for sensors.\n\n## Registers\n\n    rw is_streaming: bool @ is_streaming\n\nEnables/disables broadcast streaming\n\n    rw streaming_interval = 100: u32 ms @ streaming_interval\n\nPeriod between packets of data when streaming in milliseconds.\n"
  },
  {
    "name": "Accelerometer",
    "shortId": "accelerometer",
    "camelName": "accel",
    "shortName": "accel",
    "extends": [
      "_sensor"
    ],
    "notes": {
      "short": "A 3-axis accelerometer.",
      "events": "All events are debounced."
    },
    "classIdentifier": 521405449,
    "enums": {},
    "packets": [
      {
        "kind": "rw",
        "name": "is_streaming",
        "identifier": 3,
        "description": "Enables/disables broadcast streaming",
        "fields": [
          {
            "name": "_",
            "unit": "",
            "type": "bool",
            "storage": 1
          }
        ],
        "identifierName": "is_streaming",
        "derived": true
      },
      {
        "kind": "rw",
        "name": "streaming_interval",
        "identifier": 4,
        "description": "Period between packets of data when streaming in milliseconds.",
        "fields": [
          {
            "name": "_",
            "unit": "ms",
            "type": "u32",
            "storage": 4,
            "isSimpleType": true,
            "defaultValue": 100
          }
        ],
        "identifierName": "streaming_interval",
        "derived": true
      },
      {
        "kind": "ro",
        "name": "forces",
        "identifier": 257,
        "description": "Indicates the current forces acting on accelerometer.",
        "fields": [
          {
            "name": "x",
            "unit": "g",
            "shift": 10,
            "type": "i6.10",
            "storage": -2
          },
          {
            "name": "y",
            "unit": "g",
            "shift": 10,
            "type": "i6.10",
            "storage": -2
          },
          {
            "name": "z",
            "unit": "g",
            "shift": 10,
            "type": "i6.10",
            "storage": -2
          }
        ],
        "identifierName": "reading"
      },
      {
        "kind": "event",
        "name": "tilt_up",
        "identifier": 1,
        "description": "Emitted when accelerometer is tilted in the given direction.",
        "fields": []
      },
      {
        "kind": "event",
        "name": "tilt_down",
        "identifier": 2,
        "description": "Emitted when accelerometer is tilted in the given direction.",
        "fields": []
      },
      {
        "kind": "event",
        "name": "tilt_left",
        "identifier": 3,
        "description": "Emitted when accelerometer is tilted in the given direction.",
        "fields": []
      },
      {
        "kind": "event",
        "name": "tilt_right",
        "identifier": 4,
        "description": "Emitted when accelerometer is tilted in the given direction.",
        "fields": []
      },
      {
        "kind": "event",
        "name": "face_up",
        "identifier": 5,
        "description": "Emitted when accelerometer is laying flat in the given direction.",
        "fields": []
      },
      {
        "kind": "event",
        "name": "face_down",
        "identifier": 6,
        "description": "Emitted when accelerometer is laying flat in the given direction.",
        "fields": []
      },
      {
        "kind": "event",
        "name": "freefall",
        "identifier": 7,
        "description": "Emitted when total force acting on accelerometer is much less than 1g.",
        "fields": []
      },
      {
        "kind": "event",
        "name": "shake",
        "identifier": 11,
        "description": "Emitted when forces change violently a few times.",
        "fields": []
      },
      {
        "kind": "event",
        "name": "force_2g",
        "identifier": 12,
        "description": "Emitted when force in any direction exceeds given threshold.",
        "fields": []
      },
      {
        "kind": "event",
        "name": "force_3g",
        "identifier": 8,
        "description": "Emitted when force in any direction exceeds given threshold.",
        "fields": []
      },
      {
        "kind": "event",
        "name": "force_6g",
        "identifier": 9,
        "description": "Emitted when force in any direction exceeds given threshold.",
        "fields": []
      },
      {
        "kind": "event",
        "name": "force_8g",
        "identifier": 10,
        "description": "Emitted when force in any direction exceeds given threshold.",
        "fields": []
      }
    ],
    "source": "# Accelerometer\n\n    identifier: 0x1f140409\n    extends: _sensor\n    camel: accel\n\nA 3-axis accelerometer.\n\n## Registers\n\n    ro forces @ reading {\n        x: i6.10 g\n        y: i6.10 g\n        z: i6.10 g\n    }\n\nIndicates the current forces acting on accelerometer.\n\n## Events\n\nAll events are debounced.\n\n    event tilt_up @ 1\n    event tilt_down @ 2\n    event tilt_left @ 3\n    event tilt_right @ 4\n\nEmitted when accelerometer is tilted in the given direction.\n\n    event face_up @ 5\n    event face_down @ 6\n\nEmitted when accelerometer is laying flat in the given direction.\n\n    event freefall @ 7\n\nEmitted when total force acting on accelerometer is much less than 1g.\n\n    event shake @ 11\n\nEmitted when forces change violently a few times.\n\n    event force_2g @ 12\n    event force_3g @ 8\n    event force_6g @ 9\n    event force_8g @ 10\n\nEmitted when force in any direction exceeds given threshold.\n"
  },
  {
    "name": "Bootloader",
    "shortId": "bootloader",
    "camelName": "Bootloader",
    "shortName": "Bootloader",
    "extends": [],
    "notes": {
      "short": "Allows flashing (reprogramming) devices over JACDAC."
    },
    "classIdentifier": 536516936,
    "enums": {
      "Error": {
        "name": "Error",
        "storage": 4,
        "members": {
          "NoError": 0,
          "PacketTooSmall": 1,
          "OutOfFlashableRange": 2,
          "InvalidPageOffset": 3,
          "NotPageAligned": 4
        }
      }
    },
    "packets": [
      {
        "kind": "command",
        "name": "info",
        "identifier": 0,
        "description": "The `service_class` is always `0x1ffa9948`. The `device_class` identifies the kind of firmware\nthat \"fits\" this device.",
        "fields": [],
        "identifierName": "announce"
      },
      {
        "kind": "report",
        "name": "info",
        "identifier": 0,
        "description": "The `service_class` is always `0x1ffa9948`. The `device_class` identifies the kind of firmware\nthat \"fits\" this device.",
        "fields": [
          {
            "name": "service_class",
            "unit": "",
            "type": "u32",
            "storage": 4,
            "isSimpleType": true
          },
          {
            "name": "page_size",
            "unit": "bytes",
            "type": "u32",
            "storage": 4,
            "isSimpleType": true
          },
          {
            "name": "flashable_size",
            "unit": "bytes",
            "type": "u32",
            "storage": 4,
            "isSimpleType": true
          },
          {
            "name": "device_class",
            "unit": "",
            "type": "u32",
            "storage": 4,
            "isSimpleType": true
          }
        ]
      },
      {
        "kind": "command",
        "name": "set_session",
        "identifier": 129,
        "description": "The flashing host should generate a random id, and use this command to set it.",
        "fields": [
          {
            "name": "session_id",
            "unit": "",
            "type": "u32",
            "storage": 4,
            "isSimpleType": true
          }
        ]
      },
      {
        "kind": "report",
        "name": "set_session",
        "identifier": 129,
        "description": "The flashing host should generate a random id, and use this command to set it.",
        "fields": [
          {
            "name": "session_id",
            "unit": "",
            "type": "u32",
            "storage": 4,
            "isSimpleType": true
          }
        ]
      },
      {
        "kind": "command",
        "name": "page_data",
        "identifier": 128,
        "description": "Use to send flashing data. A physical page is split into `chunk_max + 1` chunks, where `chunk_no = 0 ... chunk_max`.\nEach chunk is stored at `page_address + page_offset`. `page_address` has to be equal in all chunks,\nand is included in response.\nOnly the last chunk causes writing to flash and elicits response.\n\nErrors not listed are also possible. Errors larger than `0xffff` indicate de-synchronization on chunk numbers.",
        "fields": [
          {
            "name": "page_address",
            "unit": "",
            "type": "u32",
            "storage": 4,
            "isSimpleType": true
          },
          {
            "name": "page_offset",
            "unit": "",
            "type": "u16",
            "storage": 2,
            "isSimpleType": true
          },
          {
            "name": "chunk_no",
            "unit": "",
            "type": "u8",
            "storage": 1,
            "isSimpleType": true
          },
          {
            "name": "chunk_max",
            "unit": "",
            "type": "u8",
            "storage": 1,
            "isSimpleType": true
          },
          {
            "name": "session_id",
            "unit": "",
            "type": "u32",
            "storage": 4,
            "isSimpleType": true
          },
          {
            "name": "reserved0",
            "unit": "",
            "type": "u32",
            "storage": 4,
            "isSimpleType": true
          },
          {
            "name": "reserved1",
            "unit": "",
            "type": "u32",
            "storage": 4,
            "isSimpleType": true
          },
          {
            "name": "reserved2",
            "unit": "",
            "type": "u32",
            "storage": 4,
            "isSimpleType": true
          },
          {
            "name": "reserved3",
            "unit": "",
            "type": "u32",
            "storage": 4,
            "isSimpleType": true
          },
          {
            "name": "page_data",
            "unit": "",
            "type": "bytes",
            "storage": 0,
            "isSimpleType": true
          }
        ]
      },
      {
        "kind": "report",
        "name": "page_data",
        "identifier": 128,
        "description": "Use to send flashing data. A physical page is split into `chunk_max + 1` chunks, where `chunk_no = 0 ... chunk_max`.\nEach chunk is stored at `page_address + page_offset`. `page_address` has to be equal in all chunks,\nand is included in response.\nOnly the last chunk causes writing to flash and elicits response.\n\nErrors not listed are also possible. Errors larger than `0xffff` indicate de-synchronization on chunk numbers.",
        "fields": [
          {
            "name": "session_id",
            "unit": "",
            "type": "u32",
            "storage": 4,
            "isSimpleType": true
          },
          {
            "name": "page_error",
            "unit": "",
            "type": "Error",
            "storage": 4
          },
          {
            "name": "page_address",
            "unit": "",
            "type": "u32",
            "storage": 4,
            "isSimpleType": true
          }
        ]
      }
    ],
    "source": "# Bootloader\n\n    identifier: 0x1ffa9948\n\nAllows flashing (reprogramming) devices over JACDAC.\n\n## Commands\n\n    command info @ announce { }\n    report {\n        service_class: u32\n        page_size: u32 bytes\n        flashable_size: u32 bytes\n        device_class: u32\n    }\n\nThe `service_class` is always `0x1ffa9948`. The `device_class` identifies the kind of firmware\nthat \"fits\" this device.\n\n    command set_session @ 0x81 {\n        session_id: u32\n    }\n    report {\n        session_id: u32\n    }\n\nThe flashing host should generate a random id, and use this command to set it.\n\n    enum Error : u32 {\n        NoError = 0\n        PacketTooSmall = 1\n        OutOfFlashableRange = 2\n        InvalidPageOffset = 3\n        NotPageAligned = 4\n    }\n    command page_data @ 0x80 {\n        page_address: u32\n        page_offset: u16\n        chunk_no: u8\n        chunk_max: u8\n        session_id: u32\n        reserved0: u32\n        reserved1: u32\n        reserved2: u32\n        reserved3: u32\n        page_data: bytes\n    }\n    report {\n        session_id: u32\n        page_error: Error\n        page_address: u32\n    }\n\nUse to send flashing data. A physical page is split into `chunk_max + 1` chunks, where `chunk_no = 0 ... chunk_max`.\nEach chunk is stored at `page_address + page_offset`. `page_address` has to be equal in all chunks,\nand is included in response.\nOnly the last chunk causes writing to flash and elicits response.\n\nErrors not listed are also possible. Errors larger than `0xffff` indicate de-synchronization on chunk numbers.\n"
  },
  {
    "name": "Button",
    "shortId": "button",
    "camelName": "Button",
    "shortName": "Button",
    "extends": [
      "_sensor"
    ],
    "notes": {
      "short": "A simple push-button.\n\nNote: this service will stream readings while the button is pressed and shortly after it's released, even\nwhen `is_streaming == 0`. TODO remove this?"
    },
    "classIdentifier": 343122531,
    "enums": {},
    "packets": [
      {
        "kind": "rw",
        "name": "is_streaming",
        "identifier": 3,
        "description": "Enables/disables broadcast streaming",
        "fields": [
          {
            "name": "_",
            "unit": "",
            "type": "bool",
            "storage": 1
          }
        ],
        "identifierName": "is_streaming",
        "derived": true
      },
      {
        "kind": "rw",
        "name": "streaming_interval",
        "identifier": 4,
        "description": "Period between packets of data when streaming in milliseconds.",
        "fields": [
          {
            "name": "_",
            "unit": "ms",
            "type": "u32",
            "storage": 4,
            "isSimpleType": true,
            "defaultValue": 100
          }
        ],
        "identifierName": "streaming_interval",
        "derived": true
      },
      {
        "kind": "ro",
        "name": "pressed",
        "identifier": 257,
        "description": "Indicates whether the button is currently active (pressed).",
        "fields": [
          {
            "name": "_",
            "unit": "",
            "type": "bool",
            "storage": 1
          }
        ],
        "identifierName": "reading"
      },
      {
        "kind": "event",
        "name": "down",
        "identifier": 1,
        "description": "Emitted when button goes from inactive (`pressed == 0`) to active.",
        "fields": []
      },
      {
        "kind": "event",
        "name": "up",
        "identifier": 2,
        "description": "Emitted when button goes from active (`pressed == 1`) to inactive.",
        "fields": []
      },
      {
        "kind": "event",
        "name": "click",
        "identifier": 3,
        "description": "Emitted together with `up` when the press time was not longer than 500ms.",
        "fields": []
      },
      {
        "kind": "event",
        "name": "long_click",
        "identifier": 4,
        "description": "Emitted together with `up` when the press time was more than 500ms.",
        "fields": []
      }
    ],
    "source": "# Button\n\n    identifier: 0x1473a263\n    extends: _sensor\n\nA simple push-button.\n\nNote: this service will stream readings while the button is pressed and shortly after it's released, even\nwhen `is_streaming == 0`. TODO remove this?\n\n## Registers\n\n    ro pressed: bool @ reading\n\nIndicates whether the button is currently active (pressed).\n\n## Events\n\n    event down @ 0x01\n\nEmitted when button goes from inactive (`pressed == 0`) to active.\n\n    event up @ 0x02\n\nEmitted when button goes from active (`pressed == 1`) to inactive.\n\n    event click @ 0x03\n\nEmitted together with `up` when the press time was not longer than 500ms.\n\n    event long_click @ 0x04\n\nEmitted together with `up` when the press time was more than 500ms.\n"
  },
  {
    "name": "Control",
    "shortId": "control",
    "camelName": "ctrl",
    "shortName": "ctrl",
    "extends": [],
    "notes": {
      "short": "Control service is always service number `0`.\nIt handles actions common to all services on a device."
    },
    "classIdentifier": 0,
    "enums": {},
    "packets": [
      {
        "kind": "command",
        "name": "noop",
        "identifier": 128,
        "description": "Do nothing. Always ignored. Can be used to test ACKs.",
        "fields": []
      },
      {
        "kind": "command",
        "name": "identify",
        "identifier": 129,
        "description": "Blink an LED or otherwise draw user's attention.",
        "fields": []
      },
      {
        "kind": "command",
        "name": "reset",
        "identifier": 130,
        "description": "Reset device. ACK may or may not be sent.",
        "fields": []
      },
      {
        "kind": "const",
        "name": "device_description",
        "identifier": 384,
        "description": "Identifies the type of hardware (eg., ACME Corp. Servo X-42 Rev C)",
        "fields": [
          {
            "name": "_",
            "unit": "",
            "type": "string",
            "storage": 0
          }
        ]
      },
      {
        "kind": "const",
        "name": "device_class",
        "identifier": 385,
        "description": "A numeric code for the string above; used to identify firmware images.",
        "fields": [
          {
            "name": "_",
            "unit": "",
            "type": "u32",
            "storage": 4,
            "isSimpleType": true
          }
        ]
      },
      {
        "kind": "const",
        "name": "bootloader_device_class",
        "identifier": 388,
        "description": "Typically the same as `device_class` unless device was flashed by hand; the bootloader will respond to that code.",
        "fields": [
          {
            "name": "_",
            "unit": "",
            "type": "u32",
            "storage": 4,
            "isSimpleType": true
          }
        ]
      },
      {
        "kind": "const",
        "name": "firmware_version",
        "identifier": 389,
        "description": "A string describing firmware version; typically semver.",
        "fields": [
          {
            "name": "_",
            "unit": "",
            "type": "string",
            "storage": 0
          }
        ]
      },
      {
        "kind": "ro",
        "name": "temperature",
        "identifier": 386,
        "description": "MCU temperature in degrees Celsius (approximate).",
        "fields": [
          {
            "name": "_",
            "unit": "C",
            "type": "i16",
            "storage": -2,
            "isSimpleType": true
          }
        ]
      },
      {
        "kind": "ro",
        "name": "uptime",
        "identifier": 390,
        "description": "Number of microseconds since boot.",
        "fields": [
          {
            "name": "_",
            "unit": "us",
            "type": "u64",
            "storage": 8,
            "isSimpleType": true
          }
        ]
      }
    ],
    "source": "# Control\n\n    identifier: 0x00000000\n    camel: ctrl\n\nControl service is always service number `0`.\nIt handles actions common to all services on a device.\n\n\n\n## Commands\n\n    command noop @ 0x80 { }\n\nDo nothing. Always ignored. Can be used to test ACKs.\n\n    command identify @ 0x81 { }\n\nBlink an LED or otherwise draw user's attention.\n\n    command reset @ 0x82 { }\n\nReset device. ACK may or may not be sent.\n\n## Registers\n\n    const device_description: string @ 0x180\n\nIdentifies the type of hardware (eg., ACME Corp. Servo X-42 Rev C)\n\n    const device_class: u32 @ 0x181\n\nA numeric code for the string above; used to identify firmware images.\n\n    const bootloader_device_class: u32 @ 0x184\n\nTypically the same as `device_class` unless device was flashed by hand; the bootloader will respond to that code.\n\n    const firmware_version: string @ 0x185\n\nA string describing firmware version; typically semver.\n\n    ro temperature: i16 C @ 0x182\n\nMCU temperature in degrees Celsius (approximate).\n\n    ro uptime: u64 us @ 0x186\n\nNumber of microseconds since boot.\n\n"
  },
  {
    "name": "Rotary encoder",
    "shortId": "crank",
    "camelName": "RotaryEncoder",
    "shortName": "crank",
    "extends": [
      "_sensor"
    ],
    "notes": {
      "short": "An incremental rotary encoder - converts angular motion of a shaft to digital signal."
    },
    "classIdentifier": 284830153,
    "enums": {},
    "packets": [
      {
        "kind": "rw",
        "name": "is_streaming",
        "identifier": 3,
        "description": "Enables/disables broadcast streaming",
        "fields": [
          {
            "name": "_",
            "unit": "",
            "type": "bool",
            "storage": 1
          }
        ],
        "identifierName": "is_streaming",
        "derived": true
      },
      {
        "kind": "rw",
        "name": "streaming_interval",
        "identifier": 4,
        "description": "Period between packets of data when streaming in milliseconds.",
        "fields": [
          {
            "name": "_",
            "unit": "ms",
            "type": "u32",
            "storage": 4,
            "isSimpleType": true,
            "defaultValue": 100
          }
        ],
        "identifierName": "streaming_interval",
        "derived": true
      },
      {
        "kind": "ro",
        "name": "position",
        "identifier": 257,
        "description": "Upon device reset starts at `0` (regardless of the shaft position).\nIncreases by `1` for a clockwise \"click\", by `-1` for counter-clockwise.",
        "fields": [
          {
            "name": "_",
            "unit": "",
            "type": "i32",
            "storage": -4,
            "isSimpleType": true
          }
        ],
        "identifierName": "reading"
      },
      {
        "kind": "const",
        "name": "clicks_per_turn",
        "identifier": 384,
        "description": "This specifies by how much `position` changes when the crank does 360 degree turn. Typically 12 or 24.",
        "fields": [
          {
            "name": "_",
            "unit": "",
            "type": "u16",
            "storage": 2,
            "isSimpleType": true
          }
        ],
        "optional": true
      }
    ],
    "source": "# Rotary encoder\n\n    identifier: 0x10fa29c9\n    extends: _sensor\n    short: crank\n\nAn incremental rotary encoder - converts angular motion of a shaft to digital signal.\n\n## Registers\n\n    ro position: i32 @ reading\n\nUpon device reset starts at `0` (regardless of the shaft position).\nIncreases by `1` for a clockwise \"click\", by `-1` for counter-clockwise.\n\n    const clicks_per_turn?: u16 @ 0x180\n\nThis specifies by how much `position` changes when the crank does 360 degree turn. Typically 12 or 24."
  },
  {
    "name": "Gamepad",
    "shortId": "gamepad",
    "camelName": "Gamepad",
    "shortName": "Gamepad",
    "extends": [
      "_sensor"
    ],
    "notes": {
      "short": "A gamepad with direction and action buttons for 1 or more players."
    },
    "classIdentifier": 501915758,
    "enums": {
      "Button": {
        "name": "Button",
        "storage": 2,
        "members": {
          "Left": 1,
          "Up": 2,
          "Right": 3,
          "Down": 4,
          "A": 5,
          "B": 6,
          "Menu": 7,
          "MenuAlt": 8,
          "Reset": 9,
          "Exit": 10
        }
      }
    },
    "packets": [
      {
        "kind": "rw",
        "name": "is_streaming",
        "identifier": 3,
        "description": "Enables/disables broadcast streaming",
        "fields": [
          {
            "name": "_",
            "unit": "",
            "type": "bool",
            "storage": 1
          }
        ],
        "identifierName": "is_streaming",
        "derived": true
      },
      {
        "kind": "rw",
        "name": "streaming_interval",
        "identifier": 4,
        "description": "Period between packets of data when streaming in milliseconds.",
        "fields": [
          {
            "name": "_",
            "unit": "ms",
            "type": "u32",
            "storage": 4,
            "isSimpleType": true,
            "defaultValue": 100
          }
        ],
        "identifierName": "streaming_interval",
        "derived": true
      },
      {
        "kind": "command",
        "name": "announce",
        "identifier": 0,
        "description": "Indicates number of players supported and which buttons are present on the controller.",
        "fields": [],
        "identifierName": "announce"
      },
      {
        "kind": "report",
        "name": "announce",
        "identifier": 0,
        "description": "Indicates number of players supported and which buttons are present on the controller.",
        "fields": [
          {
            "name": "flags",
            "unit": "",
            "type": "u8",
            "storage": 1,
            "isSimpleType": true
          },
          {
            "name": "num_players",
            "unit": "",
            "type": "u8",
            "storage": 1,
            "isSimpleType": true
          },
          {
            "name": "button_present",
            "unit": "",
            "type": "Button",
            "storage": 2,
            "startRepeats": true
          }
        ]
      },
      {
        "kind": "ro",
        "name": "buttons",
        "identifier": 257,
        "description": "Indicates which buttons are currently active (pressed).\n`pressure` should be `0xff` for digital buttons, and proportional for analog ones.",
        "fields": [
          {
            "name": "button",
            "unit": "",
            "type": "Button",
            "storage": 2,
            "startRepeats": true
          },
          {
            "name": "player_index",
            "unit": "",
            "type": "u8",
            "storage": 1,
            "isSimpleType": true
          },
          {
            "name": "pressure",
            "unit": "frac",
            "type": "u8",
            "storage": 1,
            "isSimpleType": true
          }
        ],
        "identifierName": "reading"
      },
      {
        "kind": "event",
        "name": "down",
        "identifier": 1,
        "description": "Emitted when button goes from inactive to active.",
        "fields": [
          {
            "name": "button",
            "unit": "",
            "type": "Button",
            "storage": 2
          },
          {
            "name": "player_index",
            "unit": "",
            "type": "u16",
            "storage": 2,
            "isSimpleType": true
          }
        ]
      },
      {
        "kind": "event",
        "name": "up",
        "identifier": 2,
        "description": "Emitted when button goes from active to inactive.",
        "fields": [
          {
            "name": "button",
            "unit": "",
            "type": "Button",
            "storage": 2
          },
          {
            "name": "player_index",
            "unit": "",
            "type": "u16",
            "storage": 2,
            "isSimpleType": true
          }
        ]
      }
    ],
    "source": "# Gamepad\n\n    identifier: 0x1deaa06e\n    extends: _sensor\n\nA gamepad with direction and action buttons for 1 or more players.\n\n## Commands\n\n    enum Button : u16 {\n        Left = 1\n        Up = 2\n        Right = 3\n        Down = 4\n        A = 5\n        B = 6\n        Menu = 7\n        MenuAlt = 8\n        Reset = 9\n        Exit = 10\n    }\n    command announce @ announce {}\n    report {\n        flags: u8\n        num_players: u8\n    repeats:\n        button_present: Button\n    }\n\nIndicates number of players supported and which buttons are present on the controller.\n\n## Registers\n\n    ro buttons @ reading {\n    repeats:\n        button: Button\n        player_index: u8\n        pressure: u8 frac\n    }\n\nIndicates which buttons are currently active (pressed).\n`pressure` should be `0xff` for digital buttons, and proportional for analog ones.\n\n## Events\n\n    event down @ 0x01 {\n        button: Button\n        player_index: u16\n    }\n\nEmitted when button goes from inactive to active.\n\n    event up @ 0x02 {\n        button: Button\n        player_index: u16\n    }\n\nEmitted when button goes from active to inactive.\n"
  },
  {
    "name": "Humidity",
    "shortId": "humidity",
    "camelName": "Humidity",
    "shortName": "Humidity",
    "extends": [
      "_sensor"
    ],
    "notes": {
      "short": "A sensor measuring humidity of outside environment.",
      "registers": "Default streaming interval is 1s."
    },
    "classIdentifier": 382210232,
    "enums": {},
    "packets": [
      {
        "kind": "rw",
        "name": "is_streaming",
        "identifier": 3,
        "description": "Enables/disables broadcast streaming",
        "fields": [
          {
            "name": "_",
            "unit": "",
            "type": "bool",
            "storage": 1
          }
        ],
        "identifierName": "is_streaming",
        "derived": true
      },
      {
        "kind": "rw",
        "name": "streaming_interval",
        "identifier": 4,
        "description": "Period between packets of data when streaming in milliseconds.",
        "fields": [
          {
            "name": "_",
            "unit": "ms",
            "type": "u32",
            "storage": 4,
            "isSimpleType": true,
            "defaultValue": 100
          }
        ],
        "identifierName": "streaming_interval",
        "derived": true
      },
      {
        "kind": "ro",
        "name": "humidity",
        "identifier": 257,
        "description": "The relative humidity in percentage of full water saturation.",
        "fields": [
          {
            "name": "_",
            "unit": "%RH",
            "shift": 10,
            "type": "u22.10",
            "storage": 4
          }
        ],
        "identifierName": "reading"
      }
    ],
    "source": "# Humidity\n\n    identifier: 0x16c810b8\n    extends: _sensor\n\nA sensor measuring humidity of outside environment.\n\n## Registers\n\nDefault streaming interval is 1s.\n\n    ro humidity: u22.10 %RH @ reading\n\nThe relative humidity in percentage of full water saturation.\n"
  },
  {
    "name": "Light",
    "shortId": "light",
    "camelName": "Light",
    "shortName": "Light",
    "extends": [],
    "notes": {
      "short": "A controller for strips of RGB LEDs.",
      "long": "## Light programs\n\nRealistically, with 1 mbit JACDAC, we can transmit under 2k of data per animation frame (at 20fps).\nIf transmitting raw data that would be around 500 pixels, which is not enough for many\ninstallations and it would completely clog the network.\n\nThus, light service defines a domain-specific language for describing light animations\nand efficiently transmitting them over wire.\n\nLight commands are not JACDAC commands.\nLight commands are efficiently encoded as sequences of bytes and typically sent as payload\nof `run` command.\n\nDefinitions:\n* `P` - position in the strip\n* `R` - number of repetitions of the command\n* `N` - number of pixels affected by the command\n* `C` - single color designation\n* `C+` - sequence of color designations\n\nUpdate modes:\n* `0` - replace\n* `1` - add RGB\n* `2` - subtract RGB\n* `3` - multiply RGB (by c/128); each pixel value will change by at least 1\n\nProgram commands:\n* `0xD0: set_all(C+)` - set all pixels in current range to given color pattern\n* `0xD1: fade(C+)` - set pixels in current range to colors between colors in sequence\n* `0xD2: fade_hsv(C+)` - similar to `fade()`, but colors are specified and faded in HSV\n* `0xD3: rotate_fwd(K)` - rotate (shift) pixels by `K` positions away from the connector\n* `0xD4: rotate_back(K)` - same, but towards the connector\n* `0xD5: show(M=50)` - send buffer to strip and wait `M` milliseconds\n* `0xD6: range(P=0, N=length, W=1, S=0)` - range from pixel `P`, `N` pixels long\n  (currently unsupported: every `W` pixels skip `S` pixels)\n* `0xD7: mode(K=0)` - set update mode\n* `0xD8: mode1(K=0)` - set update mode for next command only\n* `0xCF: set1(P, C)` - set one pixel at `P` (in current range) to given color\n\nA number `k` is encoded as follows:\n* `0 <= k < 128` -> `k`\n* `128 <= k < 16383` -> `0x80 | (k >> 8), k & 0xff`\n* bigger and negative numbers are not supported\n\nThus, bytes `0xC0-0xFF` are free to use for commands.\n\nFormats:\n* `0xC1, R, G, B` - single color parameter\n* `0xC2, R0, G0, B0, R1, G1, B1` - two color parameter\n* `0xC3, R0, G0, B0, R1, G1, B1, R2, G2, B2` - three color parameter\n* `0xC0, N, R0, G0, B0, ..., R(N-1), G(N-1), B(N-1)` - `N` color parameter\n* `0xCF, <number>, R, G, B` - `set1` special format\n\nCommands are encoded as command byte, followed by parameters in the order\nfrom the command definition.\n\nThe `set1()` command has irregular encoding to save space - it is byte `0xCF` followed by encoded\nnumber, and followed by 3 bytes of color."
    },
    "classIdentifier": 309264608,
    "enums": {
      "LightType": {
        "name": "LightType",
        "storage": 1,
        "members": {
          "WS2812B_GRB": 0,
          "APA102": 16,
          "SK9822": 17
        }
      }
    },
    "packets": [
      {
        "kind": "rw",
        "name": "brightness",
        "identifier": 1,
        "description": "Set the luminosity of the strip.\nAt `0` the power to the strip is completely shut down.",
        "fields": [
          {
            "name": "_",
            "unit": "frac",
            "type": "u8",
            "storage": 1,
            "isSimpleType": true,
            "defaultValue": 15
          }
        ],
        "identifierName": "intensity"
      },
      {
        "kind": "ro",
        "name": "actual_brightness",
        "identifier": 384,
        "description": "This is the luminosity actually applied to the strip.\nMay be lower than `brightness` if power-limited by the `max_power` register.\nIt will rise slowly (few seconds) back to `brightness` is limits are no longer required.",
        "fields": [
          {
            "name": "_",
            "unit": "frac",
            "type": "u8",
            "storage": 1,
            "isSimpleType": true
          }
        ]
      },
      {
        "kind": "rw",
        "name": "light_type",
        "identifier": 128,
        "description": "Specifies the type of light strip connected to controller.\nControllers which are sold with lights should default to the correct type\nand could not allow change.",
        "fields": [
          {
            "name": "_",
            "unit": "",
            "type": "LightType",
            "storage": 1
          }
        ]
      },
      {
        "kind": "rw",
        "name": "num_pixels",
        "identifier": 129,
        "description": "Specifies the number of pixels in the strip.\nControllers which are sold with lights should default to the correct length\nand could not allow change.\nIncreasing length at runtime leads to ineffective use of memory and may lead to controller reboot.",
        "fields": [
          {
            "name": "_",
            "unit": "",
            "type": "u16",
            "storage": 2,
            "isSimpleType": true,
            "defaultValue": 15
          }
        ]
      },
      {
        "kind": "rw",
        "name": "max_power",
        "identifier": 7,
        "description": "Limit the power drawn by the light-strip (and controller).",
        "fields": [
          {
            "name": "_",
            "unit": "mA",
            "type": "u16",
            "storage": 2,
            "isSimpleType": true,
            "defaultValue": 200
          }
        ],
        "identifierName": "max_power"
      },
      {
        "kind": "command",
        "name": "run",
        "identifier": 129,
        "description": "Run the given light \"program\". See service description for details.",
        "fields": [
          {
            "name": "program",
            "unit": "",
            "type": "bytes",
            "storage": 0,
            "isSimpleType": true
          }
        ]
      }
    ],
    "source": "# Light\n\n    identifier: 0x126f00e0\n\nA controller for strips of RGB LEDs.\n\n## Light programs\n\nRealistically, with 1 mbit JACDAC, we can transmit under 2k of data per animation frame (at 20fps).\nIf transmitting raw data that would be around 500 pixels, which is not enough for many\ninstallations and it would completely clog the network.\n\nThus, light service defines a domain-specific language for describing light animations\nand efficiently transmitting them over wire.\n\nLight commands are not JACDAC commands.\nLight commands are efficiently encoded as sequences of bytes and typically sent as payload\nof `run` command.\n\nDefinitions:\n* `P` - position in the strip\n* `R` - number of repetitions of the command\n* `N` - number of pixels affected by the command\n* `C` - single color designation\n* `C+` - sequence of color designations\n\nUpdate modes:\n* `0` - replace\n* `1` - add RGB\n* `2` - subtract RGB\n* `3` - multiply RGB (by c/128); each pixel value will change by at least 1\n\nProgram commands:\n* `0xD0: set_all(C+)` - set all pixels in current range to given color pattern\n* `0xD1: fade(C+)` - set pixels in current range to colors between colors in sequence\n* `0xD2: fade_hsv(C+)` - similar to `fade()`, but colors are specified and faded in HSV\n* `0xD3: rotate_fwd(K)` - rotate (shift) pixels by `K` positions away from the connector\n* `0xD4: rotate_back(K)` - same, but towards the connector\n* `0xD5: show(M=50)` - send buffer to strip and wait `M` milliseconds\n* `0xD6: range(P=0, N=length, W=1, S=0)` - range from pixel `P`, `N` pixels long\n  (currently unsupported: every `W` pixels skip `S` pixels)\n* `0xD7: mode(K=0)` - set update mode\n* `0xD8: mode1(K=0)` - set update mode for next command only\n* `0xCF: set1(P, C)` - set one pixel at `P` (in current range) to given color\n\nA number `k` is encoded as follows:\n* `0 <= k < 128` -> `k`\n* `128 <= k < 16383` -> `0x80 | (k >> 8), k & 0xff`\n* bigger and negative numbers are not supported\n\nThus, bytes `0xC0-0xFF` are free to use for commands.\n\nFormats:\n* `0xC1, R, G, B` - single color parameter\n* `0xC2, R0, G0, B0, R1, G1, B1` - two color parameter\n* `0xC3, R0, G0, B0, R1, G1, B1, R2, G2, B2` - three color parameter\n* `0xC0, N, R0, G0, B0, ..., R(N-1), G(N-1), B(N-1)` - `N` color parameter\n* `0xCF, <number>, R, G, B` - `set1` special format\n\nCommands are encoded as command byte, followed by parameters in the order\nfrom the command definition.\n\nThe `set1()` command has irregular encoding to save space - it is byte `0xCF` followed by encoded\nnumber, and followed by 3 bytes of color.\n\n## Registers\n\n    rw brightness = 15: u8 frac @ intensity\n\nSet the luminosity of the strip.\nAt `0` the power to the strip is completely shut down.\n\n    ro actual_brightness: u8 frac @ 0x180\n\nThis is the luminosity actually applied to the strip.\nMay be lower than `brightness` if power-limited by the `max_power` register.\nIt will rise slowly (few seconds) back to `brightness` is limits are no longer required.\n \n    enum LightType : u8 {\n        WS2812B_GRB = 0x00\n        APA102 = 0x10\n        SK9822 = 0x11\n    }\n    rw light_type: LightType @ 0x80\n\nSpecifies the type of light strip connected to controller.\nControllers which are sold with lights should default to the correct type\nand could not allow change.\n\n    rw num_pixels = 15: u16 @ 0x81\n\nSpecifies the number of pixels in the strip.\nControllers which are sold with lights should default to the correct length\nand could not allow change.\nIncreasing length at runtime leads to ineffective use of memory and may lead to controller reboot.\n\n    rw max_power = 200: u16 mA @ max_power\n\nLimit the power drawn by the light-strip (and controller).\n\n## Commands\n\n    command run @ 0x81 {\n        program: bytes\n    }\n\nRun the given light \"program\". See service description for details.\n"
  },
  {
    "name": "Logger",
    "shortId": "logger",
    "camelName": "Logger",
    "shortName": "Logger",
    "extends": [],
    "notes": {
      "short": "A service which can report messages to the bus."
    },
    "classIdentifier": 316415946,
    "enums": {
      "Priority": {
        "name": "Priority",
        "storage": 1,
        "members": {
          "Debug": 0,
          "Log": 1,
          "Warning": 2,
          "Error": 3
        }
      }
    },
    "packets": [
      {
        "kind": "rw",
        "name": "min_priority",
        "identifier": 128,
        "description": "Messages with level lower than this won't be emitted. The default setting may vary.",
        "fields": [
          {
            "name": "_",
            "unit": "",
            "type": "Priority",
            "storage": 1,
            "defaultValue": 1
          }
        ]
      },
      {
        "kind": "report",
        "name": "debug",
        "identifier": 128,
        "description": "Report a message.",
        "fields": [
          {
            "name": "message",
            "unit": "",
            "type": "string",
            "storage": 0
          }
        ]
      },
      {
        "kind": "report",
        "name": "log",
        "identifier": 129,
        "description": "Report a message.",
        "fields": [
          {
            "name": "message",
            "unit": "",
            "type": "string",
            "storage": 0
          }
        ]
      },
      {
        "kind": "report",
        "name": "warn",
        "identifier": 130,
        "description": "Report a message.",
        "fields": [
          {
            "name": "message",
            "unit": "",
            "type": "string",
            "storage": 0
          }
        ]
      },
      {
        "kind": "report",
        "name": "error",
        "identifier": 131,
        "description": "Report a message.",
        "fields": [
          {
            "name": "message",
            "unit": "",
            "type": "string",
            "storage": 0
          }
        ]
      }
    ],
    "source": "# Logger\n\n    identifier: 0x12dc1fca\n\nA service which can report messages to the bus.\n\n## Registers\n\n    enum Priority : u8 {\n        Debug = 0,\n        Log = 1,\n        Warning = 2,\n        Error = 3\n    }\n    rw min_priority = 1: Priority @ 0x80\n\nMessages with level lower than this won't be emitted. The default setting may vary.\n\n## Commands\n\n    report debug @ 0x80 {\n        message: string\n    }\n    report log @ 0x81 {\n        message: string\n    }\n    report warn @ 0x82 {\n        message: string\n    }\n    report error @ 0x83 {\n        message: string\n    }\n\nReport a message.\n"
  },
  {
    "name": "Motor",
    "shortId": "motor",
    "camelName": "Motor",
    "shortName": "Motor",
    "extends": [],
    "notes": {
      "short": "A bi-directional DC motor."
    },
    "classIdentifier": 385895640,
    "enums": {},
    "packets": [
      {
        "kind": "rw",
        "name": "duty",
        "identifier": 2,
        "description": "PWM duty cycle of the motor. Use negative/positive values to run the motor forwards and backwards.\nPositive is recommended to be clockwise rotation and negative counterclockwise.",
        "fields": [
          {
            "name": "_",
            "unit": "frac",
            "type": "i16",
            "storage": -2,
            "isSimpleType": true
          }
        ],
        "identifierName": "value"
      },
      {
        "kind": "rw",
        "name": "enabled",
        "identifier": 1,
        "description": "Turn the power to the motor on/off.",
        "fields": [
          {
            "name": "_",
            "unit": "",
            "type": "bool",
            "storage": 1
          }
        ],
        "identifierName": "intensity"
      }
    ],
    "source": "# Motor\n\n    identifier: 0x17004cd8\n\nA bi-directional DC motor.\n\n## Registers\n\n    rw duty: i16 frac @ value\n\nPWM duty cycle of the motor. Use negative/positive values to run the motor forwards and backwards.\nPositive is recommended to be clockwise rotation and negative counterclockwise.\n\n    rw enabled: bool @ intensity\n\nTurn the power to the motor on/off.\n"
  },
  {
    "name": "Multitouch",
    "shortId": "multitouch",
    "camelName": "Multitouch",
    "shortName": "Multitouch",
    "extends": [
      "_sensor"
    ],
    "notes": {
      "short": "A capacitive touch sensor with multiple inputs.",
      "events": "Most events include the channel number of the input."
    },
    "classIdentifier": 416636459,
    "enums": {},
    "packets": [
      {
        "kind": "rw",
        "name": "is_streaming",
        "identifier": 3,
        "description": "Enables/disables broadcast streaming",
        "fields": [
          {
            "name": "_",
            "unit": "",
            "type": "bool",
            "storage": 1
          }
        ],
        "identifierName": "is_streaming",
        "derived": true
      },
      {
        "kind": "rw",
        "name": "streaming_interval",
        "identifier": 4,
        "description": "Period between packets of data when streaming in milliseconds.",
        "fields": [
          {
            "name": "_",
            "unit": "ms",
            "type": "u32",
            "storage": 4,
            "isSimpleType": true,
            "defaultValue": 100
          }
        ],
        "identifierName": "streaming_interval",
        "derived": true
      },
      {
        "kind": "ro",
        "name": "capacity",
        "identifier": 257,
        "description": "Capacitance of channels. The capacitance is continuously calibrated, and a value of `0` indicates\nno touch, wheres a value of around `100` or more indicates touch.\nIt's best to ignore this (unless debugging), and use events.",
        "fields": [
          {
            "name": "_",
            "unit": "",
            "type": "i32[]",
            "storage": 0
          }
        ],
        "identifierName": "reading"
      },
      {
        "kind": "event",
        "name": "touch",
        "identifier": 1,
        "description": "Emitted when an input is touched.",
        "fields": [
          {
            "name": "channel",
            "unit": "",
            "type": "u32",
            "storage": 4,
            "isSimpleType": true
          }
        ]
      },
      {
        "kind": "event",
        "name": "release",
        "identifier": 2,
        "description": "Emitted when an input is no longer touched.",
        "fields": [
          {
            "name": "channel",
            "unit": "",
            "type": "u32",
            "storage": 4,
            "isSimpleType": true
          }
        ]
      },
      {
        "kind": "event",
        "name": "tap",
        "identifier": 3,
        "description": "Emitted when an input is briefly touched. TODO Not implemented.",
        "fields": [
          {
            "name": "channel",
            "unit": "",
            "type": "u32",
            "storage": 4,
            "isSimpleType": true
          }
        ]
      },
      {
        "kind": "event",
        "name": "long_press",
        "identifier": 4,
        "description": "Emitted when an input is touched for longer than 500ms. TODO Not implemented.",
        "fields": [
          {
            "name": "channel",
            "unit": "",
            "type": "u32",
            "storage": 4,
            "isSimpleType": true
          }
        ]
      },
      {
        "kind": "event",
        "name": "swipe_pos",
        "identifier": 16,
        "description": "Emitted when input channels are successively touched in order of increasing channel numbers.",
        "fields": []
      },
      {
        "kind": "event",
        "name": "swipe_neg",
        "identifier": 17,
        "description": "Emitted when input channels are successively touched in order of decreasing channel numbers.",
        "fields": []
      }
    ],
    "source": "# Multitouch\n\n    identifier: 0x18d55e2b\n    extends: _sensor\n\nA capacitive touch sensor with multiple inputs.\n\n## Registers\n\n    ro capacity: i32[] @ reading\n\nCapacitance of channels. The capacitance is continuously calibrated, and a value of `0` indicates\nno touch, wheres a value of around `100` or more indicates touch.\nIt's best to ignore this (unless debugging), and use events.\n\n## Events\n\nMost events include the channel number of the input.\n\n    event touch @ 0x01 {\n        channel: u32\n    }\n\nEmitted when an input is touched.\n\n    event release @ 0x02 {\n        channel: u32\n    }\n\nEmitted when an input is no longer touched.\n\n    event tap @ 0x03 {\n        channel: u32\n    }\n\nEmitted when an input is briefly touched. TODO Not implemented.\n\n    event long_press @ 0x04 {\n        channel: u32\n    }\n\nEmitted when an input is touched for longer than 500ms. TODO Not implemented.\n\n    event swipe_pos @ 0x10\n\nEmitted when input channels are successively touched in order of increasing channel numbers.\n\n    event swipe_neg @ 0x11\n\nEmitted when input channels are successively touched in order of decreasing channel numbers.\n"
  },
  {
    "name": "Music",
    "shortId": "music",
    "camelName": "Music",
    "shortName": "Music",
    "extends": [],
    "notes": {
      "short": "A simple buzzer."
    },
    "classIdentifier": 458731991,
    "enums": {},
    "packets": [
      {
        "kind": "rw",
        "name": "volume",
        "identifier": 1,
        "description": "The volume (duty cycle) of the buzzer.",
        "fields": [
          {
            "name": "_",
            "unit": "frac",
            "type": "u8",
            "storage": 1,
            "isSimpleType": true,
            "defaultValue": 255
          }
        ],
        "identifierName": "intensity"
      },
      {
        "kind": "command",
        "name": "play_tone",
        "identifier": 128,
        "description": "Play a PWM tone with given period and duty for given duration.\nThe duty is scaled down with `volume` register.\nTo play tone at frequency `F` Hz and volume `V` (in `0..max`) you will want\nto send `P = 1000000 / F` and `D = P * V / (2 * max)`.",
        "fields": [
          {
            "name": "period",
            "unit": "us",
            "type": "u16",
            "storage": 2,
            "isSimpleType": true
          },
          {
            "name": "duty",
            "unit": "us",
            "type": "u16",
            "storage": 2,
            "isSimpleType": true
          },
          {
            "name": "duration",
            "unit": "ms",
            "type": "u16",
            "storage": 2,
            "isSimpleType": true
          }
        ]
      }
    ],
    "source": "# Music\n\n    identifier: 0x1b57b1d7\n\nA simple buzzer.\n\n## Registers\n\n    rw volume = 255: u8 frac @ intensity\n\nThe volume (duty cycle) of the buzzer.\n\n## Commands\n\n    command play_tone @ 0x80 {\n        period: u16 us\n        duty: u16 us\n        duration: u16 ms\n    }\n\nPlay a PWM tone with given period and duty for given duration.\nThe duty is scaled down with `volume` register.\nTo play tone at frequency `F` Hz and volume `V` (in `0..max`) you will want\nto send `P = 1000000 / F` and `D = P * V / (2 * max)`.\n"
  },
  {
    "name": "Power",
    "shortId": "power",
    "camelName": "Power",
    "shortName": "Power",
    "extends": [],
    "notes": {
      "short": "A power-provider service."
    },
    "classIdentifier": 530893146,
    "enums": {},
    "packets": [
      {
        "kind": "rw",
        "name": "enabled",
        "identifier": 1,
        "description": "Turn the power to the bus on/off.",
        "fields": [
          {
            "name": "_",
            "unit": "",
            "type": "bool",
            "storage": 1,
            "defaultValue": 1
          }
        ],
        "identifierName": "intensity"
      },
      {
        "kind": "rw",
        "name": "max_power",
        "identifier": 7,
        "description": "Limit the power provided by the service.",
        "fields": [
          {
            "name": "_",
            "unit": "mA",
            "type": "u16",
            "storage": 2,
            "isSimpleType": true,
            "defaultValue": 500
          }
        ],
        "identifierName": "max_power"
      },
      {
        "kind": "ro",
        "name": "overload",
        "identifier": 385,
        "description": "Indicates whether the power has been shut down due to overdraw.",
        "fields": [
          {
            "name": "_",
            "unit": "",
            "type": "bool",
            "storage": 1
          }
        ]
      },
      {
        "kind": "ro",
        "name": "current_draw",
        "identifier": 257,
        "description": "Present current draw from the bus.",
        "fields": [
          {
            "name": "_",
            "unit": "mA",
            "type": "u16",
            "storage": 2,
            "isSimpleType": true
          }
        ],
        "identifierName": "reading"
      },
      {
        "kind": "ro",
        "name": "battery_voltage",
        "identifier": 384,
        "description": "Voltage on input.",
        "fields": [
          {
            "name": "_",
            "unit": "mV",
            "type": "u16",
            "storage": 2,
            "isSimpleType": true
          }
        ]
      },
      {
        "kind": "ro",
        "name": "battery_charge",
        "identifier": 386,
        "description": "Fraction of charge in the battery.",
        "fields": [
          {
            "name": "_",
            "unit": "frac",
            "type": "u16",
            "storage": 2,
            "isSimpleType": true
          }
        ],
        "optional": true
      },
      {
        "kind": "const",
        "name": "battery_capacity",
        "identifier": 387,
        "description": "Energy that can be delivered to the bus when battery is fully charged.\nThis excludes conversion overheads if any.",
        "fields": [
          {
            "name": "_",
            "unit": "mWh",
            "type": "u32",
            "storage": 4,
            "isSimpleType": true
          }
        ],
        "optional": true
      },
      {
        "kind": "rw",
        "name": "keep_on_pulse_duration",
        "identifier": 128,
        "description": "Many USB power packs need current to be drawn from time to time to prevent shutdown.\nThis regulates how often and for how long such current is drawn.\nTypically a 1/8W 22 ohm resistor is used as load limiting the duty cycle to 10%.",
        "fields": [
          {
            "name": "_",
            "unit": "ms",
            "type": "u16",
            "storage": 2,
            "isSimpleType": true,
            "defaultValue": 600
          }
        ]
      },
      {
        "kind": "rw",
        "name": "keep_on_pulse_period",
        "identifier": 129,
        "description": "Many USB power packs need current to be drawn from time to time to prevent shutdown.\nThis regulates how often and for how long such current is drawn.\nTypically a 1/8W 22 ohm resistor is used as load limiting the duty cycle to 10%.",
        "fields": [
          {
            "name": "_",
            "unit": "ms",
            "type": "u16",
            "storage": 2,
            "isSimpleType": true,
            "defaultValue": 20000
          }
        ]
      }
    ],
    "source": "# Power\n\n    identifier: 0x1fa4c95a\n\nA power-provider service.\n\n## Registers\n\n    rw enabled = 1: bool @ intensity\n\nTurn the power to the bus on/off.\n\n    rw max_power = 500: u16 mA @ max_power\n\nLimit the power provided by the service.\n\n    ro overload: bool @ 0x181\n\nIndicates whether the power has been shut down due to overdraw.\n\n    ro current_draw: u16 mA @ reading\n\nPresent current draw from the bus.\n\n    ro battery_voltage: u16 mV @ 0x180\n\nVoltage on input.\n\n    ro battery_charge?: u16 frac @ 0x182\n\nFraction of charge in the battery.\n\n    const battery_capacity?: u32 mWh @ 0x183\n\nEnergy that can be delivered to the bus when battery is fully charged.\nThis excludes conversion overheads if any.\n\n    rw keep_on_pulse_duration = 600: u16 ms @ 0x80\n    rw keep_on_pulse_period = 20000: u16 ms @ 0x81\n\nMany USB power packs need current to be drawn from time to time to prevent shutdown.\nThis regulates how often and for how long such current is drawn.\nTypically a 1/8W 22 ohm resistor is used as load limiting the duty cycle to 10%.\n"
  },
  {
    "name": "PWM Light",
    "shortId": "pwm_light",
    "camelName": "PwmLight",
    "shortName": "PwmLight",
    "extends": [],
    "notes": {
      "short": "A controller for 1 or more LEDs connected in parallel.",
      "long": "## Animation steps\n\nAnimations are described using pairs of intensity and duration.\nFor example, the following animation\n`(0, 10ms), (0.5, 5ms), (0.5, 10ms), (1, 5ms), (0, 7ms), (0, 0ms)`\nwill gradually rise the intensity `0 - 0.5` in 10ms,\nthen, it will keep it steady for at `0.5` for 5ms,\nthen it will rise it again `0.5 - 1` over 10ms,\ndrop `1 - 0` in 5ms,\nand keep it at 0 for 7ms more.\nAny entry with duration of 0ms is considered to be end-marker.\n\nTo get steady glow at `x`, use animation of `(x, 60000ms), (x, 0ms)` and keep `max_iterations` at `0xffff`."
    },
    "classIdentifier": 531985491,
    "enums": {},
    "packets": [
      {
        "kind": "rw",
        "name": "brightness",
        "identifier": 1,
        "description": "Set the luminosity of the strip. The value is used to scale `start_intensity` in `steps` register.\nAt `0` the power to the strip is completely shut down.",
        "fields": [
          {
            "name": "_",
            "unit": "frac",
            "type": "u16",
            "storage": 2,
            "isSimpleType": true
          }
        ],
        "identifierName": "intensity"
      },
      {
        "kind": "rw",
        "name": "max_power",
        "identifier": 7,
        "description": "Limit the power drawn by the light-strip (and controller).",
        "fields": [
          {
            "name": "_",
            "unit": "mA",
            "type": "u16",
            "storage": 2,
            "isSimpleType": true,
            "defaultValue": 100
          }
        ],
        "identifierName": "max_power"
      },
      {
        "kind": "const",
        "name": "max_steps",
        "identifier": 384,
        "description": "Maximum number of steps allowed in animation definition. This determines the size of the `steps` register.",
        "fields": [
          {
            "name": "_",
            "unit": "",
            "type": "u8",
            "storage": 1,
            "isSimpleType": true
          }
        ]
      },
      {
        "kind": "rw",
        "name": "steps",
        "identifier": 130,
        "description": "The steps of current animation. Setting this also sets `current_iteration` to `0`.\nStep with `duration == 0` is treated as an end marker.",
        "fields": [
          {
            "name": "start_intensity",
            "unit": "frac",
            "type": "u16",
            "storage": 2,
            "isSimpleType": true,
            "startRepeats": true
          },
          {
            "name": "duration",
            "unit": "ms",
            "type": "u16",
            "storage": 2,
            "isSimpleType": true
          }
        ]
      },
      {
        "kind": "rw",
        "name": "current_iteration",
        "identifier": 128,
        "description": "Currently excecuting iteration of animation. Can be set to `0` to restart current animation.\nIf `current_iteration > max_iterations`, then no animation is currently running.",
        "fields": [
          {
            "name": "_",
            "unit": "",
            "type": "u16",
            "storage": 2,
            "isSimpleType": true
          }
        ]
      },
      {
        "kind": "rw",
        "name": "max_iterations",
        "identifier": 129,
        "description": "The animation will be repeated `max_iterations + 1` times.",
        "fields": [
          {
            "name": "_",
            "unit": "",
            "type": "u16",
            "storage": 2,
            "isSimpleType": true,
            "defaultValue": 65535
          }
        ]
      }
    ],
    "source": "# PWM Light\n\n    identifier: 0x1fb57453\n    camel: PwmLight\n\nA controller for 1 or more LEDs connected in parallel.\n\n## Animation steps\n\nAnimations are described using pairs of intensity and duration.\nFor example, the following animation\n`(0, 10ms), (0.5, 5ms), (0.5, 10ms), (1, 5ms), (0, 7ms), (0, 0ms)`\nwill gradually rise the intensity `0 - 0.5` in 10ms,\nthen, it will keep it steady for at `0.5` for 5ms,\nthen it will rise it again `0.5 - 1` over 10ms,\ndrop `1 - 0` in 5ms,\nand keep it at 0 for 7ms more.\nAny entry with duration of 0ms is considered to be end-marker.\n\nTo get steady glow at `x`, use animation of `(x, 60000ms), (x, 0ms)` and keep `max_iterations` at `0xffff`.\n\n## Registers\n\n    rw brightness: u16 frac @ intensity\n\nSet the luminosity of the strip. The value is used to scale `start_intensity` in `steps` register.\nAt `0` the power to the strip is completely shut down.\n\n    rw max_power = 100: u16 mA @ max_power\n\nLimit the power drawn by the light-strip (and controller).\n\n    const max_steps: u8 @ 0x180\n\nMaximum number of steps allowed in animation definition. This determines the size of the `steps` register.\n\n    rw steps @ 0x82 {\n        repeats:\n            start_intensity: u16 frac\n            duration: u16 ms\n    }\n\nThe steps of current animation. Setting this also sets `current_iteration` to `0`.\nStep with `duration == 0` is treated as an end marker.\n\n    rw current_iteration: u16 @ 0x80\n\nCurrently excecuting iteration of animation. Can be set to `0` to restart current animation.\nIf `current_iteration > max_iterations`, then no animation is currently running.\n\n    rw max_iterations = 0xffff: u16 @ 0x81\n\nThe animation will be repeated `max_iterations + 1` times.\n"
  },
  {
    "name": "Servo",
    "shortId": "servo",
    "camelName": "Servo",
    "shortName": "Servo",
    "extends": [],
    "notes": {
      "short": "Servo is a small motor directed with a PWM signal.\nThis services fixes the servo period at 20ms, and the pulse can be regulated."
    },
    "classIdentifier": 318542083,
    "enums": {},
    "packets": [
      {
        "kind": "rw",
        "name": "pulse",
        "identifier": 2,
        "description": "Specifies length of the pulse in microseconds. The period is always 20ms.",
        "fields": [
          {
            "name": "_",
            "unit": "us",
            "type": "u32",
            "storage": 4,
            "isSimpleType": true
          }
        ],
        "identifierName": "value"
      },
      {
        "kind": "rw",
        "name": "enabled",
        "identifier": 1,
        "description": "Turn the power to the servo on/off.",
        "fields": [
          {
            "name": "_",
            "unit": "",
            "type": "bool",
            "storage": 1
          }
        ],
        "identifierName": "intensity"
      }
    ],
    "source": "# Servo\n\n    identifier: 0x12fc9103\n\nServo is a small motor directed with a PWM signal.\nThis services fixes the servo period at 20ms, and the pulse can be regulated.\n\n## Registers\n\n    rw pulse: u32 us @ value\n\nSpecifies length of the pulse in microseconds. The period is always 20ms.\n\n    rw enabled: bool @ intensity\n\nTurn the power to the servo on/off."
  },
  {
    "name": "Slider",
    "shortId": "slider",
    "camelName": "Slider",
    "shortName": "Slider",
    "extends": [
      "_sensor"
    ],
    "notes": {
      "short": "A slider potentiometer."
    },
    "classIdentifier": 522667846,
    "enums": {},
    "packets": [
      {
        "kind": "rw",
        "name": "is_streaming",
        "identifier": 3,
        "description": "Enables/disables broadcast streaming",
        "fields": [
          {
            "name": "_",
            "unit": "",
            "type": "bool",
            "storage": 1
          }
        ],
        "identifierName": "is_streaming",
        "derived": true
      },
      {
        "kind": "rw",
        "name": "streaming_interval",
        "identifier": 4,
        "description": "Period between packets of data when streaming in milliseconds.",
        "fields": [
          {
            "name": "_",
            "unit": "ms",
            "type": "u32",
            "storage": 4,
            "isSimpleType": true,
            "defaultValue": 100
          }
        ],
        "identifierName": "streaming_interval",
        "derived": true
      },
      {
        "kind": "ro",
        "name": "position",
        "identifier": 257,
        "description": "The relative position of the slider between `0x0000` and `0xffff`.",
        "fields": [
          {
            "name": "_",
            "unit": "frac",
            "type": "u16",
            "storage": 2,
            "isSimpleType": true
          }
        ],
        "identifierName": "reading"
      }
    ],
    "source": "# Slider\n\n    identifier: 0x1f274746\n    extends: _sensor\n\nA slider potentiometer.\n\n## Registers\n\n    ro position: u16 frac @ reading\n\nThe relative position of the slider between `0x0000` and `0xffff`.\n"
  },
  {
    "name": "TCP",
    "shortId": "tcp",
    "camelName": "TCP",
    "shortName": "TCP",
    "extends": [],
    "notes": {
      "short": "Data transfer over TCP/IP and TLS stream sockets.",
      "commands": "## Pipes"
    },
    "classIdentifier": 457422603,
    "enums": {
      "TcpError": {
        "name": "TcpError",
        "storage": -4,
        "members": {
          "InvalidCommand": 1,
          "InvalidCommandPayload": 2
        }
      }
    },
    "packets": [
      {
        "kind": "command",
        "name": "open",
        "identifier": 128,
        "description": "Open pair of pipes between network peripheral and a controlling device. In/outbound refers to direction from/to internet.",
        "fields": [
          {
            "name": "inbound",
            "unit": "",
            "type": "pipe",
            "storage": 12
          }
        ],
        "pipeType": "open"
      },
      {
        "kind": "report",
        "name": "open",
        "identifier": 128,
        "description": "Open pair of pipes between network peripheral and a controlling device. In/outbound refers to direction from/to internet.",
        "fields": [
          {
            "name": "outbound_port",
            "unit": "",
            "type": "pipe_port",
            "storage": 2
          }
        ],
        "pipeType": "open"
      },
      {
        "kind": "meta_pipe_command",
        "name": "open_ssl",
        "identifier": 1,
        "description": "Open an SSL connection to a given host:port pair. Can be issued only once on given pipe.\nAfter the connection is established, an empty data report is sent.\nConnection is closed by closing the pipe.",
        "fields": [
          {
            "name": "tcp_port",
            "unit": "",
            "type": "u16",
            "storage": 2,
            "isSimpleType": true
          },
          {
            "name": "hostname",
            "unit": "",
            "type": "string",
            "storage": 0
          }
        ],
        "pipeType": "open"
      },
      {
        "kind": "pipe_command",
        "name": "outdata",
        "identifier": 0,
        "description": "Bytes to be sent directly over an established TCP or SSL connection.",
        "fields": [
          {
            "name": "data",
            "unit": "",
            "type": "bytes",
            "storage": 0,
            "isSimpleType": true
          }
        ],
        "pipeType": "open"
      },
      {
        "kind": "pipe_report",
        "name": "indata",
        "identifier": 0,
        "description": "Bytes read directly from directly over an established TCP or SSL connection.",
        "fields": [
          {
            "name": "data",
            "unit": "",
            "type": "bytes",
            "storage": 0,
            "isSimpleType": true
          }
        ],
        "pipeType": "open"
      },
      {
        "kind": "meta_pipe_report",
        "name": "error",
        "identifier": 0,
        "description": "Reported when an error is encountered. Negative error codes come directly from the SSL implementation.",
        "fields": [
          {
            "name": "error",
            "unit": "",
            "type": "TcpError",
            "storage": -4
          }
        ],
        "pipeType": "open"
      }
    ],
    "source": "# TCP\n\n    identifier: 0x1b43b70b\n\nData transfer over TCP/IP and TLS stream sockets.\n\n## Commands\n\n    command open @ 0x80 {\n        inbound: pipe\n    }\n    report {\n        outbound_port: pipe_port\n    }\n\nOpen pair of pipes between network peripheral and a controlling device. In/outbound refers to direction from/to internet.\n\n## Pipes\n\n    meta pipe command open_ssl @ 0x01 {\n        tcp_port: u16\n        hostname: string\n    }\n\nOpen an SSL connection to a given host:port pair. Can be issued only once on given pipe.\nAfter the connection is established, an empty data report is sent.\nConnection is closed by closing the pipe.\n\n    pipe command outdata {\n        data: bytes\n    }\n\nBytes to be sent directly over an established TCP or SSL connection.\n\n    pipe report indata {\n        data: bytes\n    }\n\nBytes read directly from directly over an established TCP or SSL connection.\n\n    enum TcpError : i32 {\n        InvalidCommand = 1\n        InvalidCommandPayload = 2\n    }\n    meta pipe report error @ 0x00 {\n        error: TcpError\n    }\n\nReported when an error is encountered. Negative error codes come directly from the SSL implementation.\n"
  },
  {
    "name": "Temperature",
    "shortId": "temperature",
    "camelName": "Temperature",
    "shortName": "Temperature",
    "extends": [
      "_sensor"
    ],
    "notes": {
      "short": "A thermometer measuring outside environment.",
      "registers": "Default streaming interval is 1s."
    },
    "classIdentifier": 337754823,
    "enums": {},
    "packets": [
      {
        "kind": "rw",
        "name": "is_streaming",
        "identifier": 3,
        "description": "Enables/disables broadcast streaming",
        "fields": [
          {
            "name": "_",
            "unit": "",
            "type": "bool",
            "storage": 1
          }
        ],
        "identifierName": "is_streaming",
        "derived": true
      },
      {
        "kind": "rw",
        "name": "streaming_interval",
        "identifier": 4,
        "description": "Period between packets of data when streaming in milliseconds.",
        "fields": [
          {
            "name": "_",
            "unit": "ms",
            "type": "u32",
            "storage": 4,
            "isSimpleType": true,
            "defaultValue": 100
          }
        ],
        "identifierName": "streaming_interval",
        "derived": true
      },
      {
        "kind": "ro",
        "name": "temperature",
        "identifier": 257,
        "description": "The temperature.",
        "fields": [
          {
            "name": "_",
            "unit": "C",
            "shift": 10,
            "type": "u22.10",
            "storage": 4
          }
        ],
        "identifierName": "reading"
      }
    ],
    "source": "# Temperature\n\n    identifier: 0x1421bac7\n    extends: _sensor\n\nA thermometer measuring outside environment.\n\n## Registers\n\nDefault streaming interval is 1s.\n\n    ro temperature: u22.10 C @ reading\n\nThe temperature.\n"
  },
  {
    "name": "WIFI",
    "shortId": "wifi",
    "camelName": "wifi",
    "shortName": "wifi",
    "extends": [],
    "notes": {
      "short": "Discovery and connection to WiFi networks. Separate TCP service is used for data transfer.",
      "commands": "## Event"
    },
    "classIdentifier": 413852154,
    "enums": {
      "APFlags": {
        "name": "APFlags",
        "storage": 4,
        "isFlags": true,
        "members": {
          "HasPassword": 1,
          "WPS": 2,
          "HasSecondaryChannelAbove": 4,
          "HasSecondaryChannelBelow": 8,
          "IEEE_802_11B": 256,
          "IEEE_802_11A": 512,
          "IEEE_802_11G": 1024,
          "IEEE_802_11N": 2048,
          "IEEE_802_11AC": 4096,
          "IEEE_802_11AX": 8192,
          "IEEE_802_LongRange": 32768
        }
      }
    },
    "packets": [
      {
        "kind": "command",
        "name": "scan",
        "identifier": 128,
        "description": "Initiate search for WiFi networks. Results are returned via pipe, one entry per packet.",
        "fields": [
          {
            "name": "results",
            "unit": "",
            "type": "pipe",
            "storage": 12
          }
        ],
        "pipeType": "scan"
      },
      {
        "kind": "pipe_report",
        "name": "results",
        "identifier": 0,
        "description": "Initiate search for WiFi networks. Results are returned via pipe, one entry per packet.",
        "fields": [
          {
            "name": "flags",
            "unit": "",
            "type": "APFlags",
            "storage": 4
          },
          {
            "name": "reserved",
            "unit": "",
            "type": "u32",
            "storage": 4,
            "isSimpleType": true
          },
          {
            "name": "rssi",
            "unit": "",
            "type": "i8",
            "storage": -1,
            "isSimpleType": true
          },
          {
            "name": "channel",
            "unit": "",
            "type": "u8",
            "storage": 1,
            "isSimpleType": true
          },
          {
            "name": "bssid",
            "unit": "",
            "type": "u8[6]",
            "storage": 6
          },
          {
            "name": "ssid",
            "unit": "",
            "type": "string",
            "storage": 0
          }
        ],
        "pipeType": "scan"
      },
      {
        "kind": "command",
        "name": "connect",
        "identifier": 129,
        "description": "Connect to named network. Password can be appended after ssid. Both strings have to be NUL-terminated.",
        "fields": [
          {
            "name": "ssid",
            "unit": "",
            "type": "string",
            "storage": 0
          }
        ]
      },
      {
        "kind": "command",
        "name": "disconnect",
        "identifier": 130,
        "description": "Disconnect from current WiFi network if any.",
        "fields": []
      },
      {
        "kind": "event",
        "name": "got_ip",
        "identifier": 1,
        "description": "Emitted upon successful join and IP address assignment.",
        "fields": []
      },
      {
        "kind": "event",
        "name": "lost_ip",
        "identifier": 2,
        "description": "Emitted when disconnected from network.",
        "fields": []
      }
    ],
    "source": "# WIFI\n\n    identifier: 0x18aae1fa\n    camel: wifi\n\nDiscovery and connection to WiFi networks. Separate TCP service is used for data transfer.\n\n## Commands\n\n    flags APFlags : u32 {\n        HasPassword = 0x0001\n        WPS = 0x0002\n        HasSecondaryChannelAbove = 0x0004\n        HasSecondaryChannelBelow = 0x0008\n        IEEE_802_11B = 0x0100\n        IEEE_802_11A = 0x0200\n        IEEE_802_11G = 0x0400\n        IEEE_802_11N = 0x0800\n        IEEE_802_11AC = 0x1000\n        IEEE_802_11AX = 0x2000\n        IEEE_802_LongRange = 0x8000\n    }\n    command scan @ 0x80 {\n        results: pipe\n    }\n    pipe report results {\n        flags: APFlags\n        reserved: u32\n        rssi: i8\n        channel: u8\n        bssid: u8[6]\n        ssid: string\n    }\n\nInitiate search for WiFi networks. Results are returned via pipe, one entry per packet.\n\n    command connect @ 0x81 {\n        ssid: string\n    }\n\nConnect to named network. Password can be appended after ssid. Both strings have to be NUL-terminated.\n\n    command disconnect @ 0x82 {}\n\nDisconnect from current WiFi network if any.\n\n## Event\n\n    event got_ip @ 0x01\n\nEmitted upon successful join and IP address assignment.\n\n    event lost_ip @ 0x02\n\nEmitted when disconnected from network.\n"
  }
]