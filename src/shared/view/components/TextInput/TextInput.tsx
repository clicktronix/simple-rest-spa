import React from 'react';
import { autobind } from 'core-decorators';
import TextField, { TextFieldProps } from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Adjust from '@material-ui/icons/Adjust';

export type Props = Omit<TextFieldProps, 'ref'>;

interface IState {
  type?: string;
}

export class TextInput extends React.PureComponent<Props, IState> {
  public state: IState = { type: this.props.type };

  public render() {
    const { InputProps } = this.props;
    const { type } = this.state;

    return (
      <TextField
        {...this.props as TextFieldProps}
        type={type}
        InputProps={{
          ...InputProps,
          endAdornment: this.renderEndAdornment(),
        }}
        fullWidth
      />
    );
  }

  private renderEndAdornment(): React.ReactNode {
    const { type } = this.props;

    return type === 'password'
      ? (
        <InputAdornment position="end">
          <IconButton
            aria-label="Toggle password visibility"
            onClick={this.handleClickShowPassword}
          >
            <Adjust />
          </IconButton>
        </InputAdornment>
      )
      : null;
  }

  @autobind
  private handleClickShowPassword() {
    this.setState(state => ({ type: state.type === 'password' ? 'text' : 'password' }));
  }
}
