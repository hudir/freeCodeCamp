import urllib.request, urllib.parse, urllib.error
import sqlite3


conn = sqlite3.connect('./pageRank/spider.sqlite')
cur = conn.cursor()