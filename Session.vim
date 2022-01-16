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
edit src/TaiwanView/CasesByCountiesArea/Tooltip.jsx
argglobal
balt src/TaiwanView/CasesByCountiesArea/AreaChart.jsx
setlocal fdm=indent
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=3
setlocal fml=1
setlocal fdn=10
setlocal fen
10
normal! zo
11
normal! zo
18
normal! zo
19
normal! zo
20
normal! zo
32
normal! zo
33
normal! zo
34
normal! zo
let s:l = 16 - ((15 * winheight(0) + 23) / 47)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 16
normal! 081|
lcd ~/Git/covid_19_dashboard
tabnext 1
badd +28 ~/Git/covid_19_dashboard/src/TaiwanView/CasesByCountiesArea/AreaChart.jsx
badd +0 ~/Git/covid_19_dashboard/src/App.js
badd +23 term://~/Git/covid_19_dashboard//42215:yarn\ dev
badd +17 ~/Git/covid_19_dashboard/src/TaiwanView/CasesByCountiesArea/useData.js
badd +24 ~/Git/covid_19_dashboard/src/TaiwanView/index.js
badd +3 ~/Git/covid_19_dashboard/src/TaiwanView/CasesByCountiesArea/CursorLine.js
badd +45 ~/Git/covid_19_dashboard/src/TaiwanView/CasesByCountiesArea/Tooltip.jsx
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
