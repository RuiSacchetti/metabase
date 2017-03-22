/* @flow */

import React, {Component, PropTypes} from "react";
import AutosizeTextarea from 'react-textarea-autosize';

import cx from "classnames";
import _ from "underscore";

type Props = {
    values: Array<string|null>,
    onValuesChange: (values: Array<string|null>) => void,
    validations: bool[],
    placeholder?: string,
    multi?: bool,
    onCommit: () => void,
};

export default class TextPicker extends Component<*, Props, *> {
    static propTypes = {
        values: PropTypes.array.isRequired,
        onValuesChange: PropTypes.func.isRequired,
        placeholder: PropTypes.string,
        validations: PropTypes.array,
        multi: PropTypes.bool,
        onCommit: PropTypes.func,
    };

    static defaultProps = {
        validations: [],
        placeholder: "Enter desired text"
    }

    setValue(fieldString: string|null) {
        const fieldIsNonEmpty = fieldString !== null && fieldString !== "";
        const newLineRegex = /\r?\n|\r/g;
        const values = fieldIsNonEmpty ? fieldString.replace(newLineRegex,'').split(',') : [null];
        this.props.onValuesChange(values);
    }

    render() {
        let {values, validations, multi, onCommit} = this.props;
        const hasInvalidValues = _.some(validations, (v) => v === false);

        const commitOnEnter = (e) => {
            if (e.key === "Enter" && onCommit) {
                onCommit();
            }
        };

        return (
            <div>
                <div className="FilterInput px1 pt1 relative">
                    <AutosizeTextarea
                        className={cx("input block full border-purple", { "border-error": hasInvalidValues })}
                        type="text"
                        value={values.join(',')}
                        onChange={(e) => this.setValue(e.target.value)}
                        onKeyPress={commitOnEnter}
                        placeholder={this.props.placeholder}
                        autoFocus={true}
                        style={{resize: "none"}}
                        maxRows={8}
                    />
                </div>

                { multi ?
                    <div className="p1 text-small">
                        You can enter multiple values separated by commas
                    </div>
                    : null }
            </div>
        );
    }
}
