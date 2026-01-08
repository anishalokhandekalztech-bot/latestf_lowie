import React, { useState, useEffect } from 'react';
import '../../index.css';

function PropertiesPannel({ cardStyle, setCardStyle, flexStyle, setFlexStyle, selectedCards }) {
    const [local, setLocal] = useState({
        height: cardStyle.height ? parseInt(cardStyle.height) : "",
        width: cardStyle.width ? parseInt(cardStyle.width) : "",
        borderRadius: cardStyle.borderRadius ? parseInt(cardStyle.borderRadius) : "",
        color: cardStyle.color || "#ffffff",
        background: cardStyle.background || "#101010"
    });

    useEffect(() => {
        setLocal({
            height: cardStyle.height ? parseInt(cardStyle.height) : "",
            width: cardStyle.width ? parseInt(cardStyle.width) : "",
            borderRadius: cardStyle.borderRadius ? parseInt(cardStyle.borderRadius) : "",
            color: cardStyle.color || "#ffffff",
            background: cardStyle.background || "#101010"
        });
    }, [cardStyle]);

    const handleCardStyleChange = (e) => {
        const { name, value, type } = e.target;

        // Numeric inputs: update local state always, only call setCardStyle when value meets limits
        if (type === "number" && name !== "color" && name !== "background") {
            const num = value === "" ? "" : Number(value);
            setLocal(prev => ({ ...prev, [name]: num }));

            // If empty, don't apply
            if (value === "") return;

            // Enforce apply-rules: height/width >= 50, borderRadius >= 0
            if ((name === "height" || name === "width") && num < 50) return;
            if (name === "borderRadius" && num < 0) return;

            // Apply normalized value (with px)
            setCardStyle({ [name]: `${num}px` });
            return;
        }

        // Colors and other fields: update local + apply immediately
        setLocal(prev => ({ ...prev, [name]: value }));
        if (name === "color" || name === "background") {
            setCardStyle({ [name]: value });
        }
    };

    const handleFlexStyleChange = (e) => {
        const { name, value } = e.target;
        const processedValue = name === 'gap' ? `${value}px` : value;
        setFlexStyle(prev => ({
            ...prev,
            [name]: processedValue
        }));
    };

    return (
        <div className="PropertiesPannel">
            <div className="headerDiv">Properties</div>
            <div style={{
                height: 'max-content',
                margin: 'auto',
                display: 'flex',
                flexDirection: 'column',
                marginTop: '2vh',
                width: '90%',
            }}>
                {/* Card Properties */}
                <div className='propertyHeading'>Card Properties</div>
                <div className='propertyDiv'>
                    <label className='input_label'>Height: </label>
                    <input
                        type='number'
                        name='height'
                        min={0}
                        value={local.height === "" ? "" : local.height}
                        onChange={handleCardStyleChange}
                        className='input_field'
                    />
                </div>
                <div className='propertyDiv'>
                    <label className='input_label'>Width: </label>
                    <input
                        type='number'
                        name='width'
                        min={0}
                        value={local.width === "" ? "" : local.width}
                        onChange={handleCardStyleChange}
                        className='input_field'
                    />
                </div>
                <div className='propertyDiv'>
                    <label className='input_label'>Corner Radius: </label>
                    <input
                        type='number'
                        name='borderRadius'
                        min={0}
                        value={local.borderRadius === "" ? "" : local.borderRadius}
                        onChange={handleCardStyleChange}
                        className='input_field'
                    />
                </div>
                <div className='propertyDiv'>
                    <label className='input_label'>Text Color: </label>
                    <input
                        type='color'
                        name='color'
                        value={local.color || "#ffffff"}
                        onChange={handleCardStyleChange}
                        className='input_field'
                    />
                </div>
                <div className='propertyDiv'>
                    <label className='input_label'>Background Color: </label>
                    <input
                        type='color'
                        name='background'
                        value={local.background || "#101010"}
                        onChange={handleCardStyleChange}
                        className='input_field'
                    />
                </div>

                {/* Flex Container Properties */}
                <div className='propertyHeading' style={{ marginTop: '20px' }}>Flex Container Properties</div>
                <div className='propertyDiv'>
                    <label className='input_label'>Direction: </label>
                    <select
                        name="flexDirection"
                        value={flexStyle.flexDirection}
                        onChange={handleFlexStyleChange}
                        className='input_field'
                    >
                        <option value="row">Row</option>
                        <option value="column">Column</option>
                        <option value="row-reverse">Row Reverse</option>
                        <option value="column-reverse">Column Reverse</option>
                    </select>
                </div>
                <div className='propertyDiv'>
                    <label className='input_label'>Justify Content: </label>
                    <select
                        name="justifyContent"
                        value={flexStyle.justifyContent}
                        onChange={handleFlexStyleChange}
                        className='input_field'
                    >
                        <option value="flex-start">Start</option>
                        <option value="center">Center</option>
                        <option value="flex-end">End</option>
                        <option value="space-between">Space Between</option>
                        <option value="space-around">Space Around</option>
                        <option value="space-evenly">Space Evenly</option>
                    </select>
                </div>
                <div className='propertyDiv'>
                    <label className='input_label'>Align Items: </label>
                    <select
                        name="alignItems"
                        value={flexStyle.alignItems}
                        onChange={handleFlexStyleChange}
                        className='input_field'
                    >
                        <option value="stretch">Stretch</option>
                        <option value="flex-start">Start</option>
                        <option value="center">Center</option>
                        <option value="flex-end">End</option>
                        <option value="baseline">Baseline</option>
                    </select>
                </div>
                <div className='propertyDiv'>
                    <label className='input_label'>Gap (px): </label>
                    <input
                        type='number'
                        name='gap'
                        value={parseInt(flexStyle.gap) || 0}
                        onChange={handleFlexStyleChange}
                        className='input_field'
                    />
                </div>
                <div className='propertyDiv'>
                    <label className='input_label'>Wrap: </label>
                    <select
                        name="flexWrap"
                        value={flexStyle.flexWrap || 'wrap'}
                        onChange={handleFlexStyleChange}
                        className='input_field'
                    >
                        <option value="wrap">Wrap</option>
                        <option value="nowrap">No Wrap</option>
                        <option value="wrap-reverse">Wrap Reverse</option>
                    </select>
                </div>
            </div>
        </div>
    );
}

export { PropertiesPannel };
