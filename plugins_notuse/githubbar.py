#!/usr/local/bin/python3.6

"""
  获取 github 个人信息
"""
#<bitbar.title>GitBar</bitbar.title>

import http.client
import json

username = "tqcenglish"
contributionGoalTracking = True;
contributionGoal = 100;
compactUI = True;
headers = {'User-Agent': 'tqcenglish'}


boldColor = "bloack";

# Font, Color, and Emoji Settings
redText = "| color=red size=14",
normalText = "| size=14",
boldText = "| color=" + boldColor + " size=14",
heartEmoji = ":heart_decoration:",
brokenHeartEmoji = ":broken_heart:";

connect = http.client.HTTPSConnection('api.github.com')
connect.request('GET', '/users/tqcenglish', headers=headers)
response = connect.getresponse()
user = json.loads(response.read())

print('username:' + user['login'])
print('location:' + user['location'])
print('bio:' + user['bio'])
