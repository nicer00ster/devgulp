import { useRef } from 'react';
import { connect } from 'react-redux';
import { Picker } from 'emoji-mart';
import { useOnClickOutside } from '../../../hooks';
import { closeEmojis } from '../../../redux/actions';
import { placeCaretAtEnd } from '../../../utils';

function Emotes(props) {
  const ref = useRef();

  useOnClickOutside(ref, () => {
    if (props.emojisOpen) {
      props.closeEmojis();
      props.bodyRef.current.innerHTML = props.bodyRef.current.innerHTML.replace(
        '::',
        '',
      );
      setTimeout(function() {
        placeCaretAtEnd(props.bodyRef.current);
      }, 0);
    }
  });

  const emojiData = props.emotes.map(emoji => {
    return {
      name: emoji
        .split('.')
        .slice(0, -1)
        .join('.'),
      short_names: [
        emoji
          .split('.')
          .slice(0, -1)
          .join('.'),
      ],
      text: '',
      emoticons: [],
      keywords: ['blob'],
      imageUrl: `/static/emotes/blobs/${emoji}`,
    };
  });

  return (
    <div ref={ref}>
      <Picker
        onClick={emoji => props.addEmoji(emoji)}
        color="#80dad3"
        i18n={{
          categories: {
            custom: 'Blobs',
          },
        }}
        include={['recent', 'custom', 'people', 'foods']}
        showPreview={false}
        showSkinTones={false}
        set="twitter"
        custom={emojiData}
        icons={{
          categories: {
            custom: () => <img src="/static/emotes/blobs/blob-outline.png" />,
          },
        }}
      />
    </div>
  );
}

const mapStateToProps = ({ root }) => ({
  emojisOpen: root.emojisOpen,
});

const mapDispatchToProps = {
  closeEmojis,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Emotes);
