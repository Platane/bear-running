import { injectGlobal } from 'preact-emotion'

export default () => injectGlobal`

*,
*::before,
*::after {
  box-sizing: border-box;
}

#app,
#root,
html,
body {
  margin:0;
  padding:0;
  height:100%;
  font-family: Helvetica;
}

`
