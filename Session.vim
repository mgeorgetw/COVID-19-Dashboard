let SessionLoad = 1
let s:so_save = &g:so | let s:siso_save = &g:siso | setg so=0 siso=0 | setl so=-1 siso=-1
let v:this_session=expand("<sfile>:p")
silent only
silent tabonly
cd ~/Git/covid_19_dashboard
if expand('%') == '' && !&modified && line('$') <= 1 && getline(1) == ''
  let s:wipebuf = bufnr('%')
endif
set shortmess=aoO
argglobal
%argdel
$argadd src/App.js
argglobal
if bufexists("term://~/Git/covid_19_dashboard//35268:/usr/local/bin/fish") | buffer term://~/Git/covid_19_dashboard//35268:/usr/local/bin/fish | else | edit term://~/Git/covid_19_dashboard//35268:/usr/local/bin/fish | endif
if &buftype ==# 'terminal'
  silent file term://~/Git/covid_19_dashboard//35268:/usr/local/bin/fish
endif
balt src/TaiwanView/TaiwanVaccinationArea/AreaChart.jsx
setlocal fdm=indent
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=3
setlocal fml=1
setlocal fdn=10
setlocal fen
let s:l = 1 - ((0 * winheight(0) + 24) / 48)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 1
normal! 0
lcd ~/Git/covid_19_dashboard
tabnext 1
badd +1 ~/Git/covid_19_dashboard/package.json
badd +9 ~/Git/covid_19_dashboard/src/App.js
badd +1 ~/Git/covid_19_dashboard/src/TaiwanView/TaiwanVaccinationArea/AreaChart.jsx
badd +78 ~/Git/covid_19_dashboard/src/TaiwanView/TaiwanVaccinationArea/AreaChart.module.css
badd +21 ~/Git/covid_19_dashboard/src/TaiwanView/TaiwanVaccinationArea/index.js
badd +43 term://~/Git/covid_19_dashboard//35268:/usr/local/bin/fish
badd +13 ~/Git/covid_19_dashboard/src/TaiwanView/TaiwanVaccinationArea/CursorLine.js
badd +6 ~/Git/covid_19_dashboard/src/TaiwanView/TaiwanVaccinationArea/RectOverlay.js
badd +3 ~/Git/covid_19_dashboard/src/TaiwanView/TaiwanVaccinationArea/Tooltip.jsx
if exists('s:wipebuf') && len(win_findbuf(s:wipebuf)) == 0 && getbufvar(s:wipebuf, '&buftype') isnot# 'terminal'
  silent exe 'bwipe ' . s:wipebuf
endif
unlet! s:wipebuf
set winheight=1 winwidth=20 shortmess=filnxtToOFc
let s:sx = expand("<sfile>:p:r")."x.vim"
if filereadable(s:sx)
  exe "source " . fnameescape(s:sx)
endif
let &g:so = s:so_save | let &g:siso = s:siso_save
set hlsearch
let g:this_session = v:this_session
let g:this_obsession = v:this_session
doautoall SessionLoadPost
unlet SessionLoad
" vim: set ft=vim :
