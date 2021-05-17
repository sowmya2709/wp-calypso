# Logmein

This utility function takes a standard url and appends the logmein query parameter.

When linking to mapped domains we sometimes want users to arrive in a logged in state.

The resulting url will take the user through WordPress.com's remote login flow to obtain a logged in state on the mapped domain without the need for third party cookie checks against WordPress.com

## Usage

```js
import { logmeinUrl } from '@automattic/logmein';
return <button href={ logmeinUrl( 'example.blog' ) } />
```
