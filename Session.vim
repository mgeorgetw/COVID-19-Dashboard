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
edit src/TaiwanView/CasesByCountiesArea/AreaChart.jsx
argglobal
setlocal fdm=indent
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=10
setlocal fml=1
setlocal fdn=10
setlocal fen
41
normal! zo
52
normal! zo
53
normal! zo
105
normal! zo
113
normal! zo
123
normal! zo
124
normal! zo
132
normal! zo
137
normal! zo
139
normal! zo
151
normal! zo
152
normal! zo
153
normal! zo
162
normal! zo
163
normal! zo
194
normal! zo
194
normal! zo
193
normal! zo
210
normal! zo
211
normal! zo
218
normal! zo
229
normal! zo
230
normal! zo
239
normal! zo
240
normal! zo
let s:l = 29 - ((28 * winheight(0) + 23) / 47)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 29
normal! 020|
lcd ~/Git/covid_19_dashboard
tabnext 1
badd +97 ~/Git/covid_19_dashboard/src/TaiwanView/CasesByCountiesArea/AreaChart.jsx
badd +125 term://~/Git/covid_19_dashboard//84912:yarn\ dev
badd +17 ~/Git/covid_19_dashboard/src/TaiwanView/CasesByCountiesArea/useData.js
badd +24 ~/Git/covid_19_dashboard/src/TaiwanView/index.js
badd +3 ~/Git/covid_19_dashboard/src/TaiwanView/CasesByCountiesArea/CursorLine.js
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
