import sqlite3
import re
import zlib
from datetime import datetime, timedelta

# Not all systems have this so conditionally define parser
try:
    import dateutil.parser as parser
except:
    pass

dnsmapping = dict()
mapping = dict()

def fixsender(sender, allsenders = None):
    global dnsmapping
    global mapping
    if sender is None: return None
    sender = sender.strip().lower()
    sender = sender.replace("<","").replace(">","")

    # check if the address has gmane.org in it
    if allsenders is not None and sender.endswith("gmane.org"):
        pieces = sender.split('-')
        realsender = None
        for s in allsenders:
            if s.startswith(pieces[0]) :
                realsender = sender
                sender = s
                break
            if realsender is None :
                for s in mapping:
                    if s.startswith(pieces[0])
                    realsender = sender
                    sender = mapping[s]
                    break
            if realsender is None : sender = pieces[0]
    
    mpieces = sender.split('@')
    if len(mpieces) !=2 : return sender
    dns = mpieces[1]
    pieces = dns.split('@')
    if dns.endswith(".edu") or dns.endswith(".com") or dns.endswith(".org") or dns.endswith(".net"):
        dns = '.'.join(pieces[-2:])
    else:
        dns = '.'.join(pieces[-3:])
    dns = dnsmapping.get(dns,dns)
    return mpieces[0] + '@' + dns

def parsemaildate(md) :
    # See if we have dateutil
    try:
        pdate = parser.parse(tdate)
        test_at = pdate.isoformat()
        return test_at
    except:
        pass

    # Non-dateutil version - we try our best

    pieces = md.split()
    notz = " ".join(pieces[:4]).strip()

    # Try a bunch of format variations - strptime() is *lame*
    dnotz = None
    for form in [ '%d %b %Y %H:%M:%S', '%d %b %Y %H:%M:%S',
        '%d %b %Y %H:%M', '%d %b %Y %H:%M', '%d %b %y %H:%M:%S',
        '%d %b %y %H:%M:%S', '%d %b %y %H:%M', '%d %b %y %H:%M' ] :
        try:
            dnotz = datetime.strptime(notz, form)
            break
        except:
            continue

    if dnotz is None :
        # print 'Bad Date:',md
        return None

    iso = dnotz.isoformat()

    tz = "+0000"
    try:
        tz = pieces[4]
        ival = int(tz) # Only want numeric timezone values
        if tz == '-0000' : tz = '+0000'
        tzh = tz[:3]
        tzm = tz[3:]
        tz = tzh+":"+tzm
    except:
        pass

    return iso+tz

def parseheader(hdr, allsenders=None):
    if hdr is None or len(hdr) < 1 : return None
    sender = None
    x = re.findall('\nFrom: .* <(\S+@\S+)>\n', hdr)
    if len(x) >= 1 :
        sender = x[0]
    else:
        x = re.findall('\nFrom: (\S+@\S+)\n', hdr)
        if len(x) >= 1 :
            sender = x[0]
    
    # normalize the domin name of Email adressses
    sender = fixsender(sender, allsenders)

    date = None
    y = re.findall('\nDate: .*, (.*)\n', hdr)
    sent_at = None
    if len(y) >= 1 :
        tdate = y[0]
        tdate = tdate[:26]
        try: 
            sent_at = parsemaildate(tdate)
        except:
            print("Date parse fail", tdate)
            return None

    subject = None
    z = re.findall('\nSubject: (.*)\n', hdr)
    if len(z) >= 1 : subject = z[0].strip().lower()

    guid = None
    e = re.findall('\nMessage-ID: (.*)\n', hdr)
    if len(e) >= 1 : guid = e[0].strip().lower()

    if sender is None or sent_at is None or subject is None or guid is None:
        return None
    return(guid, sender, subject, sent_at)




conn = sqlite3.connect('./gmaneMaliLData/content.sqlite')
cur = conn.cursor()