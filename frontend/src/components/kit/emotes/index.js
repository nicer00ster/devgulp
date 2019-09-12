import { Picker } from 'emoji-mart';

function Emotes(props) {
    const emojiData = props.emotes.map(emoji => {
        return {
            name: emoji.split('.').slice(0, -1).join('.'),
            short_names: [emoji.split('.').slice(0, -1).join('.')],
            text: '',
            emoticons: [],
            keywords: ['blob'],
            imageUrl: `/static/emotes/blobs/${emoji}`,
        }
    });

    return (
        <Picker
            ref={props.emojiRef}
            onClick={emoji => props.addEmoji(emoji)}
            color="#80dad3"
            i18n={{
                categories: {
                    custom: 'Blobs',
                }
            }}
            showPreview={false}
            showSkinTones={false}
            set="twitter"
            custom={emojiData}
        />
    );
}

export default Emotes;
