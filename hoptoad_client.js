var sys = require('sys'),
    http = require('http'),
    _ = require('underscore')._;
    growlnotify = require('growlnotify').child;

// Command line args
var APP_NAME = process.ARGV[2],
    AUTH_TOKEN = process.ARGV[3],
    TIME_OUT = process.ARGV[4] || 600000; // default 10 min

if (!APP_NAME || !AUTH_TOKEN) {
  return sys.puts("Usage: ./run hoptoad_client.js <APP_NAME> <AUTH_TOKEN>");
}

var hoptoad_site = APP_NAME + ".hoptoadapp.com",
    connection = http.createClient(80, hoptoad_site);

var headers = {};
    headers['host'] = hoptoad_site;
    headers['content-type'] = "applicaiton/json";

var last_seen_group_ids = [],
    last_seen_id, groups, group_ids, first_id;

function runClient() {
  var request = connection.request("GET", "/errors.json?auth_token=" + AUTH_TOKEN, headers);
  
  request.addListener("response", function(response) {
    var responseBody = "";
    response.setEncoding("utf8");
    response.addListener("data", function(chunk) { responseBody += chunk; });
    response.addListener("end", function() {
      var json = JSON.parse(responseBody);
      try {
        if (json.length) {
          groups = _.pluck(json, 'group'),
          group_ids = _.pluck(groups, 'id'),
          first_id = group_ids[0];
          
          // first time show first group
          if (_.isEmpty(last_seen_group_ids)) {
            growlnotify(groups[0]);
          } else {
            var indices = [];
            // collect any new groups indices that have appeared since last executed
            _.each(_.uniq(last_seen_group_ids + group_ids), function(id) {
              index = _.indexOf(group_ids, id);
              if (index !== -1) indices.push(index);
            });
            // add first id to group of indices if it's not the same as last seen id and not included in indices
            if (first_id !== last_seen_id && !_.include(indices, first_id)) indices.push(0); // TODO: place in as first element of array
            _.each(indices, function(index) {
              growlnotify(groups[index]);
            });
          }
          last_seen_id = first_id;
          last_seen_group_ids = group_ids;
        }
      } catch(e) { sys.puts(e) }
    });
  });
  request.end();
  
  setTimeout(runClient, TIME_OUT);
}

runClient();
