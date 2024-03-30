

let f_b_deno = function(){
    let b_deno = false;
    if(typeof window !== 'undefined'){
        b_deno = "Deno" in window
    }
    return b_deno
}
let b_deno = f_b_deno();

let fs = (!b_deno) ? await import('fs') : null;
let readline = (!b_deno) ? await import('readline') : null;

function f_n_from_string(s) {
    return parseInt(s.replace(/\D/g, ''), 10);
}

let f_exit = function(){
  if(b_deno){
    return Deno.exit(...arguments)
  }else{
    return process.exit(...arguments)
  }
}

let f_write_text_file = async function(
    s_path, 
    s_content
){
    if(b_deno){
        return Deno.writeTextFile(s_path, s_content)
    }
    return fs.writeFileSync(s_path, s_content, 'utf8');
}
let f_read_text_file = async function(
    s_path
){
    if(b_deno){
        return Deno.readTextfile(s_path)
    }
    return fs.readFileSync(s_path, 'utf8');
}
let f_o_json_decoded_from_file = async function(
    s_path
){
    const s_json = await f_read_text_file(s_path);
    const o_config = JSON.parse(s_json);
    return o_config;
}
let f_write_o_json_encoded = async function(
    s_path, 
    v
){
    if(typeof v != 'string'){
        v = JSON.stringify(v, null, 4)
    }
    return f_write_text_file(s_path, v)
}

let f_s_input_from_cli = async function(s_leading_text){
    if(b_deno){
        return prompt(...arguments)
    }
    return new Promise((resolve) => {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        rl.question(s_leading_text, (input) => {
            rl.close();
            resolve(input); // Resolve the promise with the input
        });
    });
}
let f_s_first_letter_uppercase = function(s){
    return s.charAt(0).toUpperCase() + s.slice(1);
}

export { 
    f_write_text_file,
    f_read_text_file,
    f_o_json_decoded_from_file,
    f_write_o_json_encoded, 
    f_b_deno, 
    f_s_input_from_cli, 
    f_exit, 
    f_n_from_string, 
    f_s_first_letter_uppercase
}