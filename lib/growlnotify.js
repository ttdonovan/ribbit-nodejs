var sys = require('sys'),
exec = require('child_process').exec,
child;

function growlnotifyCommand(notification) {
  var notify = notification,
  error_message = notify.error_message.replace(/[\\'\`]/g, ''),
  error_title = notify.error_class,
  rails_env = notify.rails_env,
  controller = notify.controller,
  action = notify.action,
  line_number = notify.line_number,
  image_path = "images/frog.png",
  cmd = [];
  
  cmd.push("growlnotify --image " + image_path);
  cmd.push("-s -m");
  cmd.push("'" + error_message + "\n\nenv: " + rails_env + "\ncontroller: " + controller + "\naction: " + action + " \nline number: " + line_number + "'");
  cmd.push("-t 'Hoptoad(" + "smp" + ") " + error_title + "'");
  
  return cmd.join(" ");
}

exports.child = function(notification) {
  exec(growlnotifyCommand(notification), function(error, stdout, stderr) {
    if (error !== null) sys.puts('exec error: ' + error);
    // sys.print('stdout: ' + stdout);
    // sys.print('stderr: ' + stderr);
  });
}