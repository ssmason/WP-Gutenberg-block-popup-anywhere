/**
 * Popup Button block – editor component.
 *
 * @package SatoriPopup
 * @author  Stephen Mason <stephen@satori.digital>
 */

import {
    InnerBlocks,
    useBlockProps,
    InspectorControls,
    useSetting,
    ColorPalette,
} from '@wordpress/block-editor';
import {
    PanelBody,
    SelectControl,
    TextControl,
    Dropdown,
    Button,
    ColorIndicator,
} from '@wordpress/components';
import { useEffect, useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import {
    ALLOWED_BLOCKS,
    TEMPLATE,
    POPUP_SIZES,
    POPUP_PADDING_OPTIONS,
    BUTTON_ALIGNS,
    BORDER_RADIUS_OPTIONS,
    BORDER_RADIUS_CLASSES,
} from './constants';

/**
 * A single color control row: label + color swatch, opens ColorPalette on click.
 *
 * @param {Object} props               Component props.
 * @param {string} props.label          Control label.
 * @param {string} props.value         Current color value.
 * @param {string} props.fallback       Fallback when value is empty.
 * @param {string} props.attributeKey   Attribute key for setAttributes.
 * @param {Function} props.setAttributes Update callback.
 * @param {Array} props.colors          Theme color palette.
 * @return {JSX.Element}
 */
function ColorControlRow({
    label,
    value,
    fallback,
    attributeKey,
    setAttributes,
    colors,
}) {
    const [customInput, setCustomInput] = useState('');

    const handleCustomHexChange = (input) => {
        setCustomInput(input);
        const hex = input.startsWith('#') ? input : input ? `#${input}` : '';
        if (
            !hex ||
            /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(hex)
        ) {
            setAttributes({ [attributeKey]: hex || undefined });
        }
    };

    return (
        <Dropdown
            renderToggle={({ isOpen, onToggle }) => (
                <Button
                    variant="tertiary"
                    onClick={onToggle}
                    aria-expanded={isOpen}
                    className="w-full justify-between h-auto py-2 px-3"
                >
                    <span>{label}</span>
                    <ColorIndicator colorValue={value || fallback} />
                </Button>
            )}
            renderContent={() => (
                <div className="p-4 min-w-[220px] flex flex-col gap-3">
                    <ColorPalette
                        colors={colors}
                        value={value}
                        onChange={(color) => {
                            setCustomInput('');
                            setAttributes({ [attributeKey]: color });
                        }}
                        disableCustomColors={false}
                        clearable
                    />
                    <TextControl
                        label={__('Custom hex', 'satori-popup')}
                        value={customInput || value || ''}
                        onChange={handleCustomHexChange}
                        onBlur={() => setCustomInput('')}
                        placeholder="#000000"
                        help={__(
                            'Type or paste a hex color (e.g. #000000)',
                            'satori-popup'
                        )}
                    />
                </div>
            )}
        />
    );
}

/**
 * Edit component for the Popup Button block.
 *
 * @param {Object} props            Component props.
 * @param {Object} props.attributes Block attributes.
 * @param {Function} props.setAttributes Update attributes callback.
 * @param {string} props.clientId   Block client ID.
 * @return {JSX.Element}
 */
export default function Edit({ attributes, setAttributes, clientId }) {
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

    const colors = useSetting('color.palette') || [];
    const [isContentExpanded, setIsContentExpanded] = useState(false);

    useEffect(() => {
        if (!uniqueId) {
            setAttributes({ uniqueId: clientId });
        }
    }, [clientId, uniqueId, setAttributes]);

    const blockProps = useBlockProps({
        className: 'satori-popup-block flex flex-col satori-popup-editor',
    });

    const triggerStyle = {
        color: textColor || '#ffffff',
        backgroundColor: backgroundColor || '#000000',
    };

    const inspector = (
        <InspectorControls>
            <PanelBody title={__('Trigger', 'satori-popup')} initialOpen={true}>
                <SelectControl
                    label={__('Type', 'satori-popup')}
                    value={triggerType}
                    options={[
                        { value: 'button', label: __('Button', 'satori-popup') },
                        { value: 'link', label: __('Link', 'satori-popup') },
                    ]}
                    onChange={(v) => setAttributes({ triggerType: v })}
                />
                <TextControl
                    label={__('Button/Link text', 'satori-popup')}
                    value={buttonText}
                    onChange={(v) => setAttributes({ buttonText: v })}
                    placeholder={__('Learn more', 'satori-popup')}
                />
                <SelectControl
                    label={__('Alignment', 'satori-popup')}
                    value={buttonAlign}
                    options={BUTTON_ALIGNS}
                    onChange={(v) => setAttributes({ buttonAlign: v })}
                />
                <SelectControl
                    label={__('Border radius', 'satori-popup')}
                    value={buttonBorderRadius}
                    options={BORDER_RADIUS_OPTIONS}
                    onChange={(v) => setAttributes({ buttonBorderRadius: v })}
                />
            </PanelBody>
            <PanelBody title={__('Popup style', 'satori-popup')} initialOpen={true}>
                <SelectControl
                    label={__('Size', 'satori-popup')}
                    value={popupSize}
                    options={POPUP_SIZES}
                    onChange={(v) => setAttributes({ popupSize: v })}
                />
                <SelectControl
                    label={__('Popup corner radius', 'satori-popup')}
                    value={popupBorderRadius}
                    options={BORDER_RADIUS_OPTIONS}
                    onChange={(v) => setAttributes({ popupBorderRadius: v })}
                />
                <SelectControl
                    label={__('Popup padding', 'satori-popup')}
                    value={popupPadding}
                    options={POPUP_PADDING_OPTIONS}
                    onChange={(v) => setAttributes({ popupPadding: v })}
                />
                <p className="components-base-control__help mt-2">
                    {__(
                        'Background color and image are set in the Cover block settings.',
                        'satori-popup'
                    )}
                </p>
            </PanelBody>
            <PanelBody title={__('Colors', 'satori-popup')} initialOpen={true}>
                <div className="flex flex-col gap-1">
                    <ColorControlRow
                        label={__('Text color', 'satori-popup')}
                        value={textColor}
                        fallback="#ffffff"
                        attributeKey="textColor"
                        setAttributes={setAttributes}
                        colors={colors}
                    />
                    <ColorControlRow
                        label={__('Background color', 'satori-popup')}
                        value={backgroundColor}
                        fallback="#000000"
                        attributeKey="backgroundColor"
                        setAttributes={setAttributes}
                        colors={colors}
                    />
                    <ColorControlRow
                        label={__('Hover text color', 'satori-popup')}
                        value={hoverTextColor}
                        fallback="#000000"
                        attributeKey="hoverTextColor"
                        setAttributes={setAttributes}
                        colors={colors}
                    />
                    <ColorControlRow
                        label={__('Hover background color', 'satori-popup')}
                        value={hoverBackgroundColor}
                        fallback="#ffffff"
                        attributeKey="hoverBackgroundColor"
                        setAttributes={setAttributes}
                        colors={colors}
                    />
                </div>
            </PanelBody>
        </InspectorControls>
    );

    const id = uniqueId || clientId;
    const Tag = triggerType === 'link' ? 'a' : 'button';
    const triggerProps =
        Tag === 'a' ? { href: '#', role: 'button' } : { type: 'button' };

    return (
        <>
            {inspector}
            <div {...blockProps}>
                <div
                    className="satori-popup-trigger-wrap"
                    data-align={buttonAlign || 'left'}
                >
                    <Tag
                        {...triggerProps}
                        className={`satori-popup-trigger ${BORDER_RADIUS_CLASSES[buttonBorderRadius] ?? BORDER_RADIUS_CLASSES.md}`}
                        style={triggerStyle}
                        data-popup-trigger={id}
                        data-hover-text={hoverTextColor}
                        data-hover-bg={hoverBackgroundColor}
                    >
                        {buttonText || __('Open popup', 'satori-popup')}
                    </Tag>
                    <Button
                        variant="secondary"
                        size="small"
                        onClick={() => setIsContentExpanded(!isContentExpanded)}
                        className="satori-popup-edit-content-btn"
                    >
                        {isContentExpanded
                            ? __('Hide popup content', 'satori-popup')
                            : __('Edit popup content', 'satori-popup')}
                    </Button>
                </div>
                {isContentExpanded && (
                    <div
                        className="satori-popup-editor-content satori-popup-content"
                        data-popup-size={popupSize || 'medium'}
                        data-popup-radius={popupBorderRadius || 'lg'}
                        data-popup-padding={popupPadding || 'md'}
                        data-align={buttonAlign || 'left'}
                    >
                        <InnerBlocks
                            template={TEMPLATE}
                            templateLock={false}
                            allowedBlocks={ALLOWED_BLOCKS}
                        />
                    </div>
                )}
            </div>
        </>
    );
}
