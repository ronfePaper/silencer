import urllib, re, HTMLParser
from snownlp import SnowNLP

input = raw_input()

f = urllib.urlopen(input).readlines()
f = ''.join(f)

f = re.findall('<p.*>.+?</p>', f)

g = []
for each in f:
    #filter short term
    if len(each) > 10:
        #strip HTML tags
        tempSentence = re.sub('<[^<]+?>', '', each)
        #Decode to unicode
        tempSentence = tempSentence.decode('gb2312')
        #push to list
        g.append(tempSentence)

#turn g to string
g = '\n'.join(g)

#Calc the keyword
s = SnowNLP(g)
keyWords = s.keywords(5)

#filter single character word
out = []
for each in keyWords:
    if len(each) > 1:
        out.append(each.encode('utf8'))

#Unify output
output = ','.join(out)

#Return to node
print output