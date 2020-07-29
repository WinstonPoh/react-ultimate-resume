import React, { useCallback, useContext } from 'react';

import cn from 'classnames';
import { createUseStyles } from 'react-jss';
import { animated, useSpring } from 'react-spring';
import { Avatar } from '../../commons/avatar/avatar';
import { SPRING_PROPS } from '../../commons/bouncing_round_button/bouncing_round_button_spring_props';

import { DeveloperProfileContext } from '../../../utils/context/contexts';
import { EditProfileImageDialog } from '../edit_banner_profile_dialog/edit_banner_profile_dialog';

import { useCallbackOpen } from '../../hooks/use_callback_open';

import { styles } from './edit_banner_profile_button_styles';
import { useReceivedGlobalClasses } from '../../hooks/use_received_global_classes';
import { useMode } from '../../hooks/use_mode';

const useStyles = createUseStyles(styles);

export const EditProfileImageButton = ({ basicsOptions }) => {
    const classes = useStyles();
    const [globalReceivedClasses = {}] = useReceivedGlobalClasses('banner.editProfileImageButton');
    const [mode] = useMode();
    const { onBasicsChanged } = useContext(DeveloperProfileContext);
    const [open, onOpen, onClose] = useCallbackOpen();

    const onChange = useCallback(
        (value) => {
            if (typeof onBasicsChanged === 'function') {
                onBasicsChanged({ ...basicsOptions, picture: value });
            }
        },
        [basicsOptions]
    );
    const [springProps, setSpringProps] = useSpring(() => SPRING_PROPS.default);

    const handleMouseDown = useCallback(() => setSpringProps(SPRING_PROPS.active), []);
    const handleMouseUp = useCallback(() => setSpringProps(SPRING_PROPS.default), []);
    return (
        <>
            <EditProfileImageDialog open={open} onClose={onClose} value={basicsOptions.picture} onChange={onChange} />
            {mode === 'edit' && (
                <animated.button
                    type="button"
                    className={cn(classes.container, globalReceivedClasses.container)}
                    onClick={onOpen}
                    onMouseDown={handleMouseDown}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                    style={{
                        transform: springProps.scale.to((value) => `scale3d(${value}, ${value}, ${value})`)
                    }}
                >
                    <Avatar src={basicsOptions?.picture?.url} />
                </animated.button>
            )}
        </>
    );
};
