# To update data, run the 'npm run update-data' script which will call this script.
# This script ONLY updates the english data. Unfortunately, the other languages are no longer supported.

import urllib.request, json, os
from bs4 import BeautifulSoup

path = os.path.dirname(os.path.abspath(__file__))
print('Working directory: '+path)
os.chdir(path)
os.makedirs('../assets/js/', exist_ok=True)
os.makedirs('./.tmp', exist_ok=True)

opener = urllib.request.build_opener()
opener.addheaders = [('User-agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36')]
urllib.request.install_opener(opener)
print('Start generating js files...')


print('Start generating heroes.ts...')

print('Downloading heroes.html...')
url = 'https://epic7db.com/heroes'
urllib.request.urlretrieve(url, './.tmp/heroes.html')
with open('./.tmp/heroes.html', encoding='utf-8') as f:
    heroes_html = BeautifulSoup(f, 'html.parser')
hero_list = heroes_html.find_all('li', class_='hero')

print('Parsing heroes.html...')
characters = []
for hero_li in hero_list:
    character = {}
    link = hero_li.find('a')
    character['_id'] = link['href'].split('/')[-1]
    character['name'] = hero_li.get('data-name')
    character['rarity'] = int(hero_li.get('data-stars'))
    character['role'] = hero_li.get('data-class')
    character['attribute'] = hero_li.get('data-element')
    character['zodiac'] = hero_li.get('data-zodiac')
    if character['rarity'] > 1:
        characters.append(character)

print('Saving heroes.ts...')
back_json=json.dumps(characters, indent = 4, ensure_ascii=True)
back_json = '''import { Character } from './types';

export const en: Character[] = ''' +back_json + ';'
with open("../assets/js/en.characters.ts", "w", encoding='utf-8') as outfile: 
    outfile.write(back_json)

print('Done generating heroes.ts')

print('Start generating artifacts.ts...')

print('Downloading artifacts.html...')
url = 'https://epic7db.com/artifacts'
urllib.request.urlretrieve(url, './.tmp/artifacts.html')
with open('./.tmp/artifacts.html', encoding='utf-8') as f:
    artifacts_html = BeautifulSoup(f, 'html.parser')
artifact_list = artifacts_html.find_all('li', class_='artifact')

print('Parsing artifacts.html...')
artifacts = []
for artifact_li in artifact_list:
    artifact = {}
    link = artifact_li.find('a')
    artifact['_id']=link['href'].split('/')[-1]
    artifact['name']=artifact_li.get('data-name')
    artifact['rarity']=int(artifact_li.get('data-stars'))
    artifact['role']=artifact_li.get('data-class')
    if artifact['rarity'] > 2:
        artifacts.append(artifact)

print('Saving artifacts.ts...')
back_json=json.dumps(artifacts, indent = 4, ensure_ascii=True)
back_json = '''import { Artifact } from './types';

export const en: Artifact[] = ''' +back_json + ';'
with open("../assets/js/en.artifacts.ts", "w", encoding='utf-8') as outfile: 
    outfile.write(back_json)

print('Done generating artifacts.ts')

print('Cleaning up .tmp folder...')
os.rmdir('./.tmp')
print('Cleaned up .tmp folder')

print('Done generating js files')
