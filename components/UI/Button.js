import { Pressable, StyleSheet, View, Text } from "react-native";
import { GlobalStyles } from "../../constants/Style";

function Button({ onPress, children, mode, style }) {
    return (
        <View style={style}>
            <Pressable
                onPress={onPress}
                style={({ pressed }) =>
                    pressed ? [styles.pressed, mode === 'flat' && styles.flat] : [mode === 'flat' && styles.flat]
                }
            >
                <View>
                    <Text style={[styles.buttonText, mode === 'flat' && styles.flatText]}>
                        {children}
                    </Text>
                </View>
            </Pressable>
        </View>
    );
}

export default Button;

const styles = StyleSheet.create({
    buttonContainer: {
        borderRadius: 6,
        overflow: 'hidden', // Prevents Pressable from overflowing the rounded corners
    },
    flat: {
        backgroundColor: "transparent",
    },
    buttonText: {
        color: "white",
        textAlign: "center",
        padding: 6,
        backgroundColor: GlobalStyles.colors.primary500, // Applied background color here instead of the container
    },
    flatText: {
        color: GlobalStyles.colors.primary200,
    },
    pressed: {
        opacity: 0.75,
        backgroundColor: GlobalStyles.colors.primary100,
    },
});
