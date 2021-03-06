/**
 * Copyright 2017 The AMP HTML Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {loadScript, validateData, writeScript} from '../../3p/3p';

/* global adingoFluct: false */
/* global fluctAdScript: false */

/**
 * @param {!Window} global
 * @param {!Object} data
 */
export function fluct(global, data) {
  validateData(data, ['g', 'u']);

  if (data['tagtype'] === 'api') {
    const cls = `fluct-unit-${data['u']}`;
    const d = global.document.createElement('div');
    d.setAttribute('class', cls);
    global.document.getElementById('c').appendChild(d);

    loadScript(global, 'https://pdn.adingo.jp/p.js', function () {
      fluctAdScript.cmd.push(function (cmd) {
        cmd.loadByGroup(data['g']);
        cmd.display(`.${cls}`, data['u']);
      });
    });
  } else {
    writeScript(
      global,
      `https://cdn-fluct.sh.adingo.jp/f.js?G=${encodeURIComponent(data['g'])}`,
      function () {
        adingoFluct.showAd(data['u']);
      }
    );
  }
}
