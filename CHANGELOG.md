## 0.1.0 (July 6, 2010)

  - initial project import
  - receive Growl notifications for single app name with auth token, third optional arg TIME_OUT (default 10 min) which sends a request for retrieving new notifications
  - on application start retrieve first notification and track all 30 notification ids, then all preceding request show any new ids or first notification if different than last seen