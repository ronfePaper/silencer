# -*- coding: utf-8 -*-
import urllib, re, HTMLParser, json, os
from snownlp import SnowNLP
from scipy import stats
from collections import Counter

pwd = os.path.dirname(os.path.realpath(__file__))
os.chdir(pwd)

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
        tempSentence = tempSentence.decode('utf8')
        #push to list
        g.append(tempSentence)

#turn g to string
g = '\n'.join(g)

#Calc the keyword
sumWords = 8989573
s = SnowNLP(g)
segT = s.words

segCounts = list(Counter(segT).items())
segSum = sum(Counter(segT).values())
dicts = open(pwd+'/llDict.txt').read()
temp = eval(dicts)

llOutput = {}
for each in segCounts:
    try:
        dictT = temp[each[0].encode('utf8')]
        testArray = [[each[1], segSum], [dictT, sumWords]]
        g, p, dof, expctd = stats.chi2_contingency(testArray, lambda_="log-likelihood")
        if p < 0.05:
            llOutput[each[0]] = g     
    except:
        next
    
sortedOutput = sorted(llOutput.iteritems(), key=lambda asd:asd[1], reverse=True)
out = []
for each in sortedOutput[0:20]:
    if len(each[0]) > 1:
        out.append(each[0].encode('utf8'))
        
output = ','.join(out)
print output