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
            onClick={emoji => props.addEmoji(emoji)}
            color="#80dad3"
            i18n={{
                categories: {
                    custom: 'Blobs',
                }
            }}
            include={['recent', 'custom', 'people', 'foods']}
            showPreview={false}
            showSkinTones={false}
            set="twitter"
            custom={emojiData}
            icons={{
                categories: {
                    custom: () => <img src='/static/emotes/blobs/blob-outline.png' />
                }
            }}
        />
    );
}

export default Emotes;
