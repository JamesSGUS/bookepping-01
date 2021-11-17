import styled from 'styled-components';
import React from 'react';
import {useTags} from 'useTags';

const Wrapper = styled.section`
  background: #FFFFFF;
  padding: 12px 16px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;

  > ol {
    margin: 0 -12px;

    > li {
      background: #D9D9D9;
      border-radius: 18px;
      display: inline-block;
      padding: 3px 18px;
      font-size: 14px;
      margin: 8px 12px;

      &.selected {
        background: #f60;
      }
    }
  }

  > button {
    background: none;
    border: none;
    padding: 2px 5px;
    color: #666;
    margin-top: 8px;
    border-bottom: 1px solid #333;
  }
`;
type Props = {
  value: number [];
  onChange: (selected: number []) => void;
}
const TagsSection: React.FC<Props> = (props) => {
  const {tags, setTags} = useTags();
  const selectedTagIds = props.value;
  const addTag = () => {
    let message;
    const tagName = window.prompt('New tag is:');
    if (tagName !== null) {
      setTags([...tags, {id: Math.random(), name: tagName}]);
    }
  };
  const onToggleTag = (tagID: number) => {
    const index = selectedTagIds.indexOf(tagID);
    if (index >= 0) {
      props.onChange(selectedTagIds.filter(t => t !== tagID));
    } else {
      props.onChange([...selectedTagIds, tagID]);
    }
  };
  const getClass = (tagId: number) => selectedTagIds.indexOf(tagId) >= 0 ? 'selected' : '';
  return (
    <Wrapper>
      <ol>
        {tags.map(tag =>
          <li key={tag.id} onClick={
            () => { onToggleTag(tag.id); }
          } className={getClass(tag.id)}>{tag.name}</li>
        )}
      </ol>
      <button onClick={addTag}>Adding Tags</button>
    </Wrapper>
  );
};

export {TagsSection};