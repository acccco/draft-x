/*
 * @Author: Aco
 * @Date: 2018-11-05 09:26:47
 * @LastEditors: Aco
 * @LastEditTime: 2018-11-23 13:16:23
 * @Description: 基础的 media 插件，用于给编辑区域添加一个 media(img,audio,vedio)
 */

import React from "react";
import { AtomicBlockUtils } from "draft-js";
import Base from "../Base";
import { createNewEntity } from "../../util";

export default class BaseAtomicase extends Base {
  constructor() {
    super();
    this.entityType = "";
    this.mutability = "IMMUTABLE";
  }

  blockRendererFn(block) {
    if (block.getType() !== "atomic") return undefined;
    const entityKey = block.getEntityAt(0);

    const entity = this.getEditorState()
      .getCurrentContent()
      .getEntity(entityKey);

    if (this.entityType === entity.getType()) {
      return {
        component: props => (
          <this.component data={entity.getData()} {...props} />
        ),
        editable: this.mutability === "MUTABLE"
      };
    }

    return undefined;
  }

  /* eslint-disable */
  blockStyleFn(block) {
    if (block.getType() !== "atomic") return "";
    return "RichEditor-media";
  }

  component() {
    return <span>插件实例需要 component 方法</span>;
  }
  /* eslint-enable */

  toggle(data) {
    this.fire(editorState => {
      const { entityKey, editorState: nextEditorState } = createNewEntity(
        editorState,
        {
          entityType: this.entityType,
          mutability: this.mutability,
          data
        }
      );

      return AtomicBlockUtils.insertAtomicBlock(
        nextEditorState,
        entityKey,
        " "
      );
    });
  }
}
