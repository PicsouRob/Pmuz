import { StyleSheet } from "react-native";

export const GlobalStyles = StyleSheet.create({
    center: {
        justifyContent: "center",
        alignItems: "center",
    },
    item_center: {
        justifyContent: "center",
        alignItems: "flex-start",
    },
    row: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
    },
    center_row: {
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
    },
    row_between: {
        justifyContent: "space-between",
        flexDirection: "row",
        paddingVertical: 5,
    },
    row_between_center: {
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center",
    },
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,

        elevation: 2,
    }
});