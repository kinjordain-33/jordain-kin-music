MAELEKEZO YA KISWAHILI - Jordain Kin Music (Chromebook)
--------------------------------------------------------

Huu ni mradi wa tovuti ya muziki yenye backend (Node.js). Umepanga kuwa 'private' kwa maana ya:
- Wewe pekee una nenosiri la admin (jkin33) kwa kupakia nyimbo.
- Wengine wanaweza kuangalia, kusikiliza na kupakua nyimbo.

Jinsi ya kutumia (kwa watumiaji wa Chromebook - bila terminal)
1. PAKUA ZIP: pakua faili `jordain-kin-music-project.zip` uliyepewa.
2. FUNGUA ZIP: double-click au tumia Files app ya Chromebook ukichagua 'Extract' ili kupata folda `jordain-kin-music-project`.
3. Mtumiaji wa kawaida: ukitaka tu kuangalia HTML, bonyeza faili `index.html` (Open with → Chrome). Hii itafanya kazi kama demo lakini haitakuwa na backend.
4. KUWEKA LIVE (Render.com) bila terminal:
   a. Fungua https://github.com na utengeneze repository mpya (New repository).
   b. Fungua repo yako kwenye GitHub website, bonyeza 'Add file' → 'Upload files' na buruta (drag & drop) mafaili yote ndani ya folder (usisahau .gitignore haipo, lakini sio lazima).
   c. Commit (bofya 'Commit changes').
   d. Fungua https://render.com na ingia (tumia akaunti ya Google ili kuwa rahisi).
   e. Chagua 'New' → 'Web Service' → 'Connect a repo' → chagua repository yako.
   f. Render itasoma `render.yaml` na ku-deploy moja kwa moja. Subiri hadi itakapomaliza; utapewa link ya tovuti yako kama https://jordain-kin-music.onrender.com
5. ADMIN: baada ya deploy, ingia kwenye tovuti yako, chagua 'Nenosiri la admin' (tumia <jkin33>) na utaona sehemu ya kupakia wimbo. Weka jina la wimbo, faili la audio na (hiari) picha ya cover. Bonyeza 'Pakia Wimbo'.
6. Kuthibitisha:
   - Baada ya upload, ukurasa utaonyesha wimbo mapya kwenye orodha na vitufe vya kucheza/pakua.
7. Kubadilisha nenosiri:
   - Unaweza kubadilisha env var ADMIN_PASSWORD kwenye Render dashboard (Service → Environment → ADD/EDIT var).
8. Kazi za development (kwa wataalamu au ikiwa utatumia Linux/Terminal):
   - Fungua terminal, nenda kwenye folder, tumia: npm install && node server.js
   - Kisha fungua: http://localhost:3000

Marekebisho:
- Nyimbo zinahifadhiwa kwenye folder `uploads/` kwenye server (Render ikipotuma).
- Faili `songs.json` inahifadhi metadata ya nyimbo (jina, URL, cover).
- Hakikisha unahifadhi backup ya `uploads/` ikiwa ni muhimu.

Ikiwa unataka, ninaweza:
- Kukusaidia ku-upload hiyo ZIP kwenye GitHub (na nitakuongoza hatua kwa hatua kwa picha).
- Au nikuunganishe mwenyewe kwa kitufe (nitakuambia hatua za kujiunga GitHub + Render bila kutumia terminal).

Asante — niambie sasa ungependa niweke wapi ZIP ili upakue (nitauweka hapa kwa download).