/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/
/* eslint-disable import/no-mutable-exports */

import React from 'react';

// This function will deliver an error message to the browser console when all of the props passed in are undefined (falsey).
import warning from 'warning';

let hasChildrenWithoutDisplayNameOf = function () {};

if (process.env.NODE_ENV !== 'production') {
	const hasWarned = {};

	// TODO: allow `displayName` to be an array of displayNames
	hasChildrenWithoutDisplayNameOf = function (control, children, displayName) {
		const childrenWithoutSelectedDisplayName = [];

		React.Children.forEach(children, (child) => {
			if (child && child.type.displayName !== displayName) {
				childrenWithoutSelectedDisplayName.push(child);
			}
		});

		if (!hasWarned[control]) {
			const hasChildrenWithoutSelectedDisplayName = childrenWithoutSelectedDisplayName.length > 0;
			/* eslint-disable max-len */
			warning(hasChildrenWithoutSelectedDisplayName, `[Design System React] No list options and no children that are NOT of display name, ${displayName}, have been set in ${control}`);
			/* eslint-enable max-len */
			hasWarned[control] = !!hasChildrenWithoutSelectedDisplayName;
		}
	};
}

export default hasChildrenWithoutDisplayNameOf;
