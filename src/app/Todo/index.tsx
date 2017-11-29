import * as React from 'react';
import { inject, observer } from 'mobx-react';

interface TodoProps {
  STORE_USER: {
    text: number,
    edit:  (text: string) => void
  };
};

interface TodoState {
  aaaaa: number
};

@inject('STORE_USER', 'STORE_ROUTER')
@observer
export class Todo extends React.Component<TodoProps, TodoState> {

  constructor(props: TodoProps) {
    super(props);

    this.state = {
      aaaaa: props.STORE_USER.text
    };
  }

  render() {
    return (
      <div>
        <h1>hello world!</h1>
      </div>
    );
  }
};
