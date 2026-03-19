/**
 * Popup Button block – save / frontend output.
 *
 * @package SatoriPopup
 * @author  Stephen Mason <stephen@satori.digital>
 */

import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';
import { BORDER_RADIUS_CLASSES } from './constants';

/**
 * Save component – outputs block markup for the frontend.
 *
 * @param {Object} props            Component props.
 * @param {Object} props.attributes Block attributes.
 * @return {JSX.Element}
 */
export default function save({ attributes }) {
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
    } = attributes;

    const id = uniqueId || '';
    const Tag = triggerType === 'link' ? 'a' : 'button';
    const triggerProps =
        Tag === 'a' ? { href: '#', role: 'button' } : { type: 'button' };

    const alignClass = {
        left: 'justify-start',
        center: 'justify-center',
        right: 'justify-end',
    }[buttonAlign || 'left'];

    const blockProps = useBlockProps.save({
        className: `satori-popup-block flex ${alignClass}`,
    });

    const triggerStyle = {
        color: textColor || '#ffffff',
        backgroundColor: backgroundColor || '#000000',
    };

    return (
        <div {...blockProps}>
            <div className="satori-popup-trigger-wrap">
                <Tag
                    {...triggerProps}
                    className={`satori-popup-trigger ${BORDER_RADIUS_CLASSES[buttonBorderRadius] ?? BORDER_RADIUS_CLASSES.md}`}
                    style={triggerStyle}
                    data-popup-trigger={id}
                    data-hover-text={hoverTextColor}
                    data-hover-bg={hoverBackgroundColor}
                >
                    {buttonText || 'Open popup'}
                </Tag>
            </div>
            <div
                className="satori-popup-overlay"
                data-popup-overlay={id}
                aria-hidden="true"
            >
                <div
                    className={`satori-popup-modal satori-popup-size-${popupSize}`}
                    data-popup-modal={id}
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby={`popup-title-${id}`}
                >
                    <button
                        type="button"
                        className="satori-popup-close"
                        data-popup-close={id}
                        aria-label="Close"
                    >
                        ×
                    </button>
                    <div
                        className="satori-popup-content"
                        data-popup-radius={popupBorderRadius || 'lg'}
                        data-popup-padding={popupPadding || 'md'}
                    >
                        <InnerBlocks.Content />
                    </div>
                </div>
            </div>
        </div>
    );
}

/**
 * Deprecated block versions for backwards compatibility.
 *
 * @type {Array<Object>}
 */
export const deprecated = [
    /* v3: has data-popup-radius, no data-popup-padding */
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
        save({ attributes }) {
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
                buttonAlign,
                buttonBorderRadius,
            } = attributes;

            const id = uniqueId || '';
            const Tag = triggerType === 'link' ? 'a' : 'button';
            const triggerProps =
                Tag === 'a' ? { href: '#', role: 'button' } : { type: 'button' };

            const alignClass = {
                left: 'justify-start',
                center: 'justify-center',
                right: 'justify-end',
            }[buttonAlign || 'left'];

            const blockProps = useBlockProps.save({
                className: `satori-popup-block flex ${alignClass}`,
            });

            const triggerStyle = {
                color: textColor || '#ffffff',
                backgroundColor: backgroundColor || '#000000',
            };

            return (
                <div {...blockProps}>
                    <div className="satori-popup-trigger-wrap">
                        <Tag
                            {...triggerProps}
                            className={`satori-popup-trigger ${BORDER_RADIUS_CLASSES[buttonBorderRadius] ?? BORDER_RADIUS_CLASSES.md}`}
                            style={triggerStyle}
                            data-popup-trigger={id}
                            data-hover-text={hoverTextColor}
                            data-hover-bg={hoverBackgroundColor}
                        >
                            {buttonText || 'Open popup'}
                        </Tag>
                    </div>
                    <div
                        className="satori-popup-overlay"
                        data-popup-overlay={id}
                        aria-hidden="true"
                    >
                        <div
                            className={`satori-popup-modal satori-popup-size-${popupSize}`}
                            data-popup-modal={id}
                            role="dialog"
                            aria-modal="true"
                            aria-labelledby={`popup-title-${id}`}
                        >
                            <button
                                type="button"
                                className="satori-popup-close"
                                data-popup-close={id}
                                aria-label="Close"
                            >
                                ×
                            </button>
                            <div
                                className="satori-popup-content"
                                data-popup-radius={popupBorderRadius || 'lg'}
                            >
                                <InnerBlocks.Content />
                            </div>
                        </div>
                    </div>
                </div>
            );
        },
        migrate(attributes) {
            return {
                ...attributes,
                popupPadding: attributes.popupPadding || 'md',
            };
        },
    },
    /* v2: trigger-wrap + button radius, no popup data-popup-radius */
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
        save({ attributes }) {
            const {
                uniqueId,
                triggerType,
                buttonText,
                textColor,
                backgroundColor,
                hoverTextColor,
                hoverBackgroundColor,
                popupSize,
                buttonAlign,
                buttonBorderRadius,
            } = attributes;

            const id = uniqueId || '';
            const Tag = triggerType === 'link' ? 'a' : 'button';
            const triggerProps =
                Tag === 'a' ? { href: '#', role: 'button' } : { type: 'button' };

            const alignClass = {
                left: 'justify-start',
                center: 'justify-center',
                right: 'justify-end',
            }[buttonAlign || 'left'];

            const blockProps = useBlockProps.save({
                className: `satori-popup-block flex ${alignClass}`,
            });

            const triggerStyle = {
                color: textColor || '#ffffff',
                backgroundColor: backgroundColor || '#000000',
            };

            return (
                <div {...blockProps}>
                    <div className="satori-popup-trigger-wrap">
                        <Tag
                            {...triggerProps}
                            className={`satori-popup-trigger ${BORDER_RADIUS_CLASSES[buttonBorderRadius] ?? BORDER_RADIUS_CLASSES.md}`}
                            style={triggerStyle}
                            data-popup-trigger={id}
                            data-hover-text={hoverTextColor}
                            data-hover-bg={hoverBackgroundColor}
                        >
                            {buttonText || 'Open popup'}
                        </Tag>
                    </div>
                    <div
                        className="satori-popup-overlay"
                        data-popup-overlay={id}
                        aria-hidden="true"
                    >
                        <div
                            className={`satori-popup-modal satori-popup-size-${popupSize}`}
                            data-popup-modal={id}
                            role="dialog"
                            aria-modal="true"
                            aria-labelledby={`popup-title-${id}`}
                        >
                            <button
                                type="button"
                                className="satori-popup-close"
                                data-popup-close={id}
                                aria-label="Close"
                            >
                                ×
                            </button>
                            <div className="satori-popup-content">
                                <InnerBlocks.Content />
                            </div>
                        </div>
                    </div>
                </div>
            );
        },
        migrate(attributes) {
            return {
                ...attributes,
                popupBorderRadius: attributes.popupBorderRadius || 'lg',
            };
        },
    },
    /* v1: no trigger-wrap, no alignment/radius */
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
        /**
         * Renders deprecated block markup (no trigger-wrap, no alignment/radius).
         *
         * @param {Object} props            Component props.
         * @param {Object} props.attributes Block attributes.
         * @return {JSX.Element}
         */
        save({ attributes }) {
            const {
                uniqueId,
                triggerType,
                buttonText,
                textColor,
                backgroundColor,
                hoverTextColor,
                hoverBackgroundColor,
                popupSize,
            } = attributes;

            const id = uniqueId || '';
            const Tag = triggerType === 'link' ? 'a' : 'button';
            const triggerProps =
                Tag === 'a' ? { href: '#', role: 'button' } : { type: 'button' };

            const blockProps = useBlockProps.save({
                className: 'satori-popup-block',
            });

            const triggerStyle = {
                color: textColor || '#ffffff',
                backgroundColor: backgroundColor || '#000000',
            };

            return (
                <div {...blockProps}>
                    <Tag
                        {...triggerProps}
                        className="satori-popup-trigger"
                        style={triggerStyle}
                        data-popup-trigger={id}
                        data-hover-text={hoverTextColor}
                        data-hover-bg={hoverBackgroundColor}
                    >
                        {buttonText || 'Open popup'}
                    </Tag>
                    <div
                        className="satori-popup-overlay"
                        data-popup-overlay={id}
                        aria-hidden="true"
                    >
                        <div
                            className={`satori-popup-modal satori-popup-size-${popupSize}`}
                            data-popup-modal={id}
                            role="dialog"
                            aria-modal="true"
                            aria-labelledby={`popup-title-${id}`}
                        >
                            <button
                                type="button"
                                className="satori-popup-close"
                                data-popup-close={id}
                                aria-label="Close"
                            >
                                ×
                            </button>
                            <div className="satori-popup-content">
                                <InnerBlocks.Content />
                            </div>
                        </div>
                    </div>
                </div>
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
