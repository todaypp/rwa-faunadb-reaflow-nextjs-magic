import { css } from '@emotion/react';
import React, { MouseEventHandler } from 'react';
import { TextareaHeightChangeMeta } from 'react-textarea-autosize/dist/declarations/src';
import {
  Node,
  Port,
  PortData,
} from 'reaflow';
import BaseNodeComponent from '../../types/BaseNodeComponent';
import BaseNodeData from '../../types/BaseNodeData';
import { BaseNodeDefaultProps } from '../../types/BaseNodeDefaultProps';
import BaseNodeProps from '../../types/BaseNodeProps';
import { createPort } from '../../utils/ports';
import Textarea from '../plugins/Textarea';

type Props = {
  updateCurrentNode?: (nodeData: Partial<BaseNodeData>) => void;
} & BaseNodeProps;

const defaultWidth = 200;
const defaultHeight = 100;

const InformationNode: BaseNodeComponent<Props> = (props) => {
  const {
    updateCurrentNode,
    ...rest
  } = props;
  const {
    onClick,
  } = props;

  return (
    <Node
      {...rest}
      port={
        <Port
          onClick={(e, node) => {
            console.log('onClick port: ', node);
          }}
          onEnter={(e, node) => {
            console.log('onEnter port: ', node);
          }}
          onLeave={(e, node) => {
            console.log('onLeave port: ', node);
          }}
          style={{ fill: 'white', stroke: 'white' }}
          rx={15}
          ry={15}
        />
      }
    >
      {
        (event) => {
          // console.log('event ...rest', rest);
          // console.log('event', event);

          const {
            width,
            height,
          } = event;

          /**
           * When textarea input height changes, we need to increase the height of the element accordingly.
           *
           * @param height
           * @param meta
           */
          const onHeightChange = (height: number, meta: TextareaHeightChangeMeta) => {
            // Only consider additional height, by ignoring the height of the first row
            const additionalHeight = height - meta.rowHeight;

            if (updateCurrentNode) {
              updateCurrentNode({
                height: defaultHeight + additionalHeight,
              });
            }
          };

          return (
            <foreignObject
              className={'information-node-container node-container'}
              width={width}
              height={height}
              x={0}
              y={0}
              css={css`
                pointer-events: none;

                div {
                  pointer-events: auto;
                }

                .node {
                  margin: 5px;
                }

                .information-text {
                  margin-top: 15px;
                  background-color: #eaeaea;
                }
              `}
              onClick={onClick as MouseEventHandler}
            >
              <div
                className={'information-node node'}
              >
                <div
                  className={'node-header information-header'}
                >
                  Information
                </div>

                <div
                  className={'question-text-contained'}
                >
                  <Textarea
                    className={'information-text'}
                    defaultValue={`Say something here`}
                    placeholder={'Say something here'}
                    onHeightChange={onHeightChange}
                  />
                </div>
              </div>
            </foreignObject>
          );
        }
      }
    </Node>
  );
};
InformationNode.getDefaultNodeProps = (): BaseNodeDefaultProps => {
  return {
    type: 'information',
    defaultWidth: defaultWidth,
    defaultHeight: defaultHeight,
    // @ts-ignore
    ports: InformationNode.getDefaultPorts(),
  };
};
InformationNode.getDefaultPorts = (): PortData[] => {
  return [
    createPort({
      height: 10,
      width: 10,
      alignment: 'CENTER',
      side: 'EAST',
    }),
    createPort({
      height: 10,
      width: 10,
      alignment: 'CENTER',
      side: 'WEST',
    }),
  ];
};

export default InformationNode;
