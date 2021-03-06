import * as React from 'react';
import { ImageIcon } from 'office-ui-fabric-react/lib/Icon';
import { mergeStyleSets } from 'office-ui-fabric-react/lib/Styling';
import { css } from 'office-ui-fabric-react/lib/Utilities';
import { TestImages } from '@uifabric/example-data';
var classNames = mergeStyleSets({
    image: {
        display: 'inline-block',
        position: 'relative',
    },
    one: {
        width: 48,
        height: 44,
        marginLeft: 27,
    },
    oneImage: {
        left: -6,
        top: -4,
    },
    check: {
        width: 35,
        height: 43,
        marginLeft: 55,
    },
    checkImage: {
        left: -60,
        top: -5,
    },
    lock: {
        width: 35,
        height: 42,
        marginLeft: 65,
    },
    lockImage: {
        width: -109,
        top: -5,
    },
});
export var IconImageSheetExample = function () {
    // ImageIcon is an optimized variant of standard Icon.
    // You could also use the standard Icon here (adding the prop `iconType={IconType.image}`).
    return (React.createElement("div", null,
        React.createElement(ImageIcon, { className: classNames.one, imageProps: {
                src: TestImages.iconOne,
                className: css(classNames.image, classNames.oneImage),
            } }),
        React.createElement(ImageIcon, { className: classNames.check, imageProps: {
                src: TestImages.iconOne,
                className: css(classNames.image, classNames.checkImage),
            } }),
        React.createElement(ImageIcon, { className: classNames.lock, imageProps: {
                src: TestImages.iconOne,
                className: css(classNames.image, classNames.lockImage),
            } })));
};
//# sourceMappingURL=Icon.ImageSheet.Example.js.map