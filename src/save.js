/**
 * Popup Button block – save / frontend output.
 *
 * @package SatoriPopup
 * @author  Stephen Mason <stephen@satori.digital>
 */

import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import { BORDER_RADIUS_CLASSES } from './constants';

/**
 * Shared popup markup for save and deprecated blocks.
 *
 * @param {Object} attrs              Block attributes.
 * @param {Object} features            Feature flags for backwards compatibility.
 * @param {boolean} features.triggerWrap      Include trigger-wrap div.
 * @param {boolean} features.buttonAlign      Include alignment classes.
 * @param {boolean} features.buttonBorderRadius Use border radius on trigger.
 * @param {boolean} features.popupBorderRadius   data-popup-radius on content.
 * @param {boolean} features.popupPadding        data-popup-padding on content.
 * @param {Object} blockProps          From useBlockProps.save().
 * @return {JSX.Element}
 */
function renderPopupMarkup(attrs, features, blockProps) {
    const {
        uniqueId,
        triggerType,
        buttonText,
        textColor,
        backgroundColor,
        hoverTextColor,
        hoverBackgroundColor,
        popupSize,
        popupBorderRadius,
        popupPadding,
        buttonAlign,
        buttonBorderRadius,
    } = attrs;

    const id = uniqueId || '';
    const Tag = triggerType === 'link' ? 'a' : 'button';
    const triggerProps =
        Tag === 'a' ? { href: '#', role: 'button' } : { type: 'button' };

    const triggerStyle = {
        color: textColor || '#ffffff',
        backgroundColor: backgroundColor || '#000000',
    };

    const triggerClass = features.buttonBorderRadius
        ? `satori-popup-trigger ${BORDER_RADIUS_CLASSES[buttonBorderRadius] ?? BORDER_RADIUS_CLASSES.md}`
        : 'satori-popup-trigger';

    const contentDataAttrs = {};
    if (features.popupBorderRadius) {
        contentDataAttrs['data-popup-radius'] = popupBorderRadius || 'lg';
    }
    if (features.popupPadding) {
        contentDataAttrs['data-popup-padding'] = popupPadding || 'md';
    }

    const triggerEl = (
        <Tag
            {...triggerProps}
            className={triggerClass}
            style={triggerStyle}
            data-popup-trigger={id}
            data-hover-text={hoverTextColor}
            data-hover-bg={hoverBackgroundColor}
        >
            {buttonText || __('Open popup', 'satori-popup')}
        </Tag>
    );

    const overlayContent = (
        <div
            className={`satori-popup-modal satori-popup-size-${popupSize}`}
            data-popup-modal={id}
            role="dialog"
            aria-modal="true"
            aria-label={__('Popup', 'satori-popup')}
            tabIndex={-1}
        >
            <button
                type="button"
                className="satori-popup-close"
                data-popup-close={id}
                aria-label={__('Close popup', 'satori-popup')}
            >
                ×
            </button>
            <div className="satori-popup-content" {...contentDataAttrs}>
                <InnerBlocks.Content />
            </div>
        </div>
    );

    const overlay = (
        <div
            className="satori-popup-overlay"
            data-popup-overlay={id}
            aria-hidden="true"
        >
            {overlayContent}
        </div>
    );

    if (features.triggerWrap) {
        return (
            <div {...blockProps}>
                <div className="satori-popup-trigger-wrap">
                    {triggerEl}
                </div>
                {overlay}
            </div>
        );
    }

    return (
        <div {...blockProps}>
            {triggerEl}
            {overlay}
        </div>
    );
}

/**
 * Save component – outputs block markup for the frontend.
 *
 * @param {Object} props            Component props.
 * @param {Object} props.attributes Block attributes.
 * @return {JSX.Element}
 */
export default function save({ attributes }) {
    const alignClass = {
        left: 'justify-start',
        center: 'justify-center',
        right: 'justify-end',
    }[attributes.buttonAlign || 'left'];
    const blockProps = useBlockProps.save({
        className: `satori-popup-block flex ${alignClass}`,
    });
    return renderPopupMarkup(
        attributes,
        {
            triggerWrap: true,
            buttonAlign: true,
            buttonBorderRadius: true,
            popupBorderRadius: true,
            popupPadding: true,
        },
        blockProps
    );
}

/**
 * Deprecated block versions for backwards compatibility.
 *
 * When block structure changes, add a new deprecated entry with migrate() to
 * transform old attributes. Save output must match the structure from that
 * block version so existing posts render correctly.
 *
 * - v3: popup radius, no popup padding
 * - v2: trigger wrap + button radius, no popup radius
 * - v1: no trigger wrap, no alignment, no radius
 *
 * @type {Array<Object>}
 */
export const deprecated = [
    {
        attributes: {
            uniqueId: { type: 'string', default: '' },
            triggerType: { type: 'string', default: 'button' },
            buttonText: { type: 'string', default: '' },
            textColor: { type: 'string', default: '#ffffff' },
            backgroundColor: { type: 'string', default: '#000000' },
            hoverTextColor: { type: 'string', default: '#000000' },
            hoverBackgroundColor: { type: 'string', default: '#ffffff' },
            popupSize: { type: 'string', default: 'medium' },
            popupBorderRadius: { type: 'string', default: 'lg' },
            buttonAlign: { type: 'string', default: 'left' },
            buttonBorderRadius: { type: 'string', default: 'md' },
        },
        save(props) {
            const alignClass = {
                left: 'justify-start',
                center: 'justify-center',
                right: 'justify-end',
            }[props.attributes.buttonAlign || 'left'];
            const blockProps = useBlockProps.save({
                className: `satori-popup-block flex ${alignClass}`,
            });
            return renderPopupMarkup(
                props.attributes,
                {
                    triggerWrap: true,
                    buttonAlign: true,
                    buttonBorderRadius: true,
                    popupBorderRadius: true,
                    popupPadding: false,
                },
                blockProps
            );
        },
        migrate(attributes) {
            return {
                ...attributes,
                popupPadding: attributes.popupPadding || 'md',
            };
        },
    },
    {
        attributes: {
            uniqueId: { type: 'string', default: '' },
            triggerType: { type: 'string', default: 'button' },
            buttonText: { type: 'string', default: '' },
            textColor: { type: 'string', default: '#ffffff' },
            backgroundColor: { type: 'string', default: '#000000' },
            hoverTextColor: { type: 'string', default: '#000000' },
            hoverBackgroundColor: { type: 'string', default: '#ffffff' },
            popupSize: { type: 'string', default: 'medium' },
            buttonAlign: { type: 'string', default: 'left' },
            buttonBorderRadius: { type: 'string', default: 'md' },
        },
        save(props) {
            const alignClass = {
                left: 'justify-start',
                center: 'justify-center',
                right: 'justify-end',
            }[props.attributes.buttonAlign || 'left'];
            const blockProps = useBlockProps.save({
                className: `satori-popup-block flex ${alignClass}`,
            });
            return renderPopupMarkup(
                props.attributes,
                {
                    triggerWrap: true,
                    buttonAlign: true,
                    buttonBorderRadius: true,
                    popupBorderRadius: false,
                    popupPadding: false,
                },
                blockProps
            );
        },
        migrate(attributes) {
            return {
                ...attributes,
                popupBorderRadius: attributes.popupBorderRadius || 'lg',
            };
        },
    },
    {
        attributes: {
            uniqueId: { type: 'string', default: '' },
            triggerType: { type: 'string', default: 'button' },
            buttonText: { type: 'string', default: '' },
            textColor: { type: 'string', default: '#ffffff' },
            backgroundColor: { type: 'string', default: '#000000' },
            hoverTextColor: { type: 'string', default: '#000000' },
            hoverBackgroundColor: { type: 'string', default: '#ffffff' },
            popupSize: { type: 'string', default: 'medium' },
        },
        save(props) {
            const blockProps = useBlockProps.save({
                className: 'satori-popup-block',
            });
            return renderPopupMarkup(
                props.attributes,
                {
                    triggerWrap: false,
                    buttonAlign: false,
                    buttonBorderRadius: false,
                    popupBorderRadius: false,
                    popupPadding: false,
                },
                blockProps
            );
        },
        migrate(attributes) {
            return {
                ...attributes,
                buttonAlign: attributes.buttonAlign || 'left',
                buttonBorderRadius: attributes.buttonBorderRadius || 'md',
                popupBorderRadius: attributes.popupBorderRadius || 'lg',
            };
        },
    },
];
