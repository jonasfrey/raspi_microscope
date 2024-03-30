// Define your classes
class O_enum_value {
    constructor(n, s, s_comment) {
        this.n = n;
        this.s = s;
        this.s_comment = s_comment;
    }
}

class O_input_sensor {
    constructor(s_type, s_name, a_o_enum_value = null) {
        this.s_type = s_type;
        this.s_name = s_name;
        this.a_o_enum_value = a_o_enum_value;
        this.value = 0;
        this.o_enum_value = null;
        this.n_nor = 0;
    }
}

class O_input_device {
    constructor(s_name, n_id_vendor, n_id_product, a_o_input_sensor) {
        this.s_name = s_name;
        this.n_id_vendor = n_id_vendor;
        this.n_id_product = n_id_product;
        this.a_o_input_sensor = a_o_input_sensor;
    }
}
export {
    O_enum_value,
    O_input_sensor,
    O_input_device
}