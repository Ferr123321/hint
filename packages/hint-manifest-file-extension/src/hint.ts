/**
 * @fileoverview Check if `.webmanifest` is used as the file extension
 * for the web app manifest file.
 */

/*
 * ------------------------------------------------------------------------------
 * Requirements
 * ------------------------------------------------------------------------------
 */

import { normalizeString } from '@hint/utils/dist/src/misc/normalize-string';
import { fileExtension as getFileExtension} from '@hint/utils/dist/src/fs/file-extension';
import { ElementFound, IHint } from 'hint/dist/src/lib/types';
import { HintContext } from 'hint/dist/src/lib/hint-context';

import meta from './meta';

/*
 * ------------------------------------------------------------------------------
 * Public
 * ------------------------------------------------------------------------------
 */

export default class ManifestFileExtensionHint implements IHint {

    public static readonly meta = meta;

    public constructor(context: HintContext) {

        const standardManifestFileExtension: string = 'webmanifest';

        const validate = ({ element, resource }: ElementFound) => {
            if (normalizeString(element.getAttribute('rel')) === 'manifest') {
                const fileExtension: string = getFileExtension(normalizeString(element.getAttribute('href')) || /* istanbul ignore next */ '');

                if (fileExtension !== standardManifestFileExtension) {
                    const message = `Web app manifest should have the filename extension '${standardManifestFileExtension}'${fileExtension ? `, not '${fileExtension}'` : ''}.`;

                    context.report(resource, message, { content: fileExtension, element });
                }
            }
        };

        context.on('element::link', validate);
    }
}
